import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, '..');
const configPath = path.join(appRoot, 'lighthouserc.js');

const config = (await readFile(configPath, 'utf8')).replace(/^\uFEFF/, '');
const { urls, budgets, assert } = JSON.parse(config);

const launchOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

const chrome = await puppeteer.launch(launchOptions);
const options = {
  logLevel: 'info',
  output: 'json',
  port: Number(new URL(chrome.wsEndpoint()).port),
  locale: 'ru',
  onlyCategories: ['performance', 'seo'],
};

let passed = true;

const formatMetricValue = (value, numericUnit) =>
  numericUnit === 'unitless' ? value.toFixed(3) : `${(value / 1000).toFixed(2)} с`;

const printLcpDiagnostics = (audits) => {
  const diagnostics = Object.entries(audits).filter(
    ([id, audit]) =>
      /lcp|largest-contentful-paint/i.test(id) &&
      !['largest-contentful-paint', 'largest-contentful-paint-element'].includes(id) &&
      audit.details,
  );

  for (const [, audit] of diagnostics) {
    const summary = audit.displayValue ?? audit.title;
    if (summary) console.log(`  LCP-диагностика: ${summary}`);

    for (const item of audit.details.items?.slice(0, 3) ?? []) {
      const description = item.phase ?? item.label ?? item.node?.snippet;
      const duration = item.duration ?? item.time;
      if (description || typeof duration === 'number') {
        const durationText = typeof duration === 'number' ? ` — ${(duration / 1000).toFixed(2)} с` : '';
        console.log(`    ${description ?? audit.title}${durationText}`);
      }
    }
  }
};

for (const url of urls) {
  console.log(`\nПроверка: ${url}`);
  const { lhr } = await lighthouse(url, options);

  const audits = lhr.audits;
  const lcp = audits['largest-contentful-paint']?.numericValue;
  const cls = audits['cumulative-layout-shift']?.numericValue;
  const fcp = audits['first-contentful-paint']?.numericValue;
  const tbt = audits['total-blocking-time']?.numericValue;

  console.log(`  LCP: ${formatMetricValue(lcp ?? 0, 'millisecond')} | FCP: ${formatMetricValue(fcp ?? 0, 'millisecond')} | TBT: ${formatMetricValue(tbt ?? 0, 'millisecond')} | CLS: ${formatMetricValue(cls ?? 0, 'unitless')}`);
  const lcpElement = audits['largest-contentful-paint-element']?.details?.items?.[0]?.node;
  if (lcpElement?.snippet) {
    console.log(`  LCP-элемент: ${lcpElement.snippet}`);
  }
  printLcpDiagnostics(audits);

  if (lcp === undefined || cls === undefined || fcp === undefined || tbt === undefined) {
    console.error('  [ERROR] В отчёте отсутствует одна или несколько обязательных метрик');
    passed = false;
  }

  const resolveAudit = (metricName) =>
    metricName === 'seo-score'
      ? { numericValue: (lhr.categories.seo?.score ?? 0) * 100, numericUnit: 'unitless' }
      : audits[metricName] ??
        (metricName === 'lcp' ? audits['largest-contentful-paint'] : undefined) ??
        (metricName === 'fcp' ? audits['first-contentful-paint'] : undefined);

  const formatThreshold = (value, numericUnit) =>
    numericUnit === 'unitless' ? value.toFixed(3) : `${(value / 1000).toFixed(2)} с`;

  for (const budget of budgets) {
    const metric = resolveAudit(budget.metric);
    if (!metric) {
      console.error(`  [ERROR] Метрика "${budget.metric}" не найдена в отчёте`);
      passed = false;
      continue;
    }
    const value = metric.numericValue;
    const threshold = budget.budget;
    const ok = value <= threshold;
    console.log(
      `  ${budget.label}: ${formatMetricValue(value, metric.numericUnit)} (лимит ${formatThreshold(threshold, metric.numericUnit)}) ${ok ? '✓' : '✗'}`,
    );
    if (!ok) passed = false;
  }

  if (assert) {
    for (const rule of assert) {
      const metric = resolveAudit(rule.metric);
      if (!metric) {
        console.error(`  [ERROR] Метрика "${rule.metric}" не найдена`);
        passed = false;
        continue;
      }
      const value = metric.numericValue;
      const ok = rule.op === '<=' ? value <= rule.threshold : value >= rule.threshold;
      console.log(
        `  ${rule.label}: ${formatMetricValue(value, metric.numericUnit)} ${ok ? '✓' : '✗'}`,
      );
      if (!ok) passed = false;
    }
  }
}

await chrome.close();

if (!passed) {
  console.error('\n[ERROR] Бюджет производительности не пройден');
  process.exitCode = 1;
} else {
  console.log('\n[OK] Бюджет производительности пройден');
}
