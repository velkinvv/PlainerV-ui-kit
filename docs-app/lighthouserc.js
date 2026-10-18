{
  "urls": [
    "http://localhost:6500/docs/ru/web/v_0.3.4/components/button/",
    "http://localhost:6500/docs/ru/web/v_0.3.4/components/datagrid/",
    "http://localhost:6500/docs/ru/web/v_0.3.4/components/dateinput/"
  ],
  "buddies": [],
  "batches": [],
  "config": {},
  "assert": [
    { "metric": "lcp", "op": "<=", "threshold": 2500, "label": "LCP < 2.5 с" },
    { "metric": "cumulative-layout-shift", "op": "<=", "threshold": 0.1, "label": "CLS < 0.1" },
    { "metric": "seo-score", "op": ">=", "threshold": 95, "label": "SEO ≥ 95" }
  ],
  "budgets": [
    { "metric": "lcp", "budget": 2500, "label": "LCP < 2.5 с" },
    { "metric": "cumulative-layout-shift", "budget": 0.1, "label": "CLS < 0.1" }
  ]
}
