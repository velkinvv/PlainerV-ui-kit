import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const isProduction = process.env.NODE_ENV === 'production';
/** В npm уходит только dist/; sourcemap на ../src ломает Vite у потребителей — генерируем только в dev. */
const emitSourceMaps = !isProduction;

const sharedTypeScriptExclude = [
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.stories.tsx',
  '**/*.story.tsx',
  '**/table/**/tableStoryDemoData.ts',
  '**/table/**/dataGridStoryDemoData.ts',
  '**/table/**/dataGridStoryDemoColumns.tsx',
];

const libraryBundleConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: emitSourceMaps,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: emitSourceMaps,
      exports: 'named',
    },
  ],
  // peer'ы и транзитивные runtime-зависимости не бандлим — в dist остаются import from "react" / "styled-components" и т.д.
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'styled-components',
    'framer-motion',
    'dayjs',
    'clsx',
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      exclude: [...sharedTypeScriptExclude, 'src/vite/**'],
      rootDir: './src',
      sourceMap: emitSourceMaps,
      declarationMap: emitSourceMaps,
    }),
    postcss({
      extract: 'styles.css',
      minimize: isProduction,
      sourceMap: emitSourceMaps,
    }),
    copy({
      targets: [
        {
          src: 'src/styles/fonts.css',
          dest: 'dist/styles',
        },
        {
          src: 'src/variables/fonts/montserrat/**/*',
          dest: 'dist/styles/fonts/montserrat',
        },
        {
          src: 'src/variables/fonts/montserrat/**/*',
          dest: 'dist/fonts/montserrat',
        },
        {
          src: 'README.md',
          dest: 'dist',
        },
      ],
    }),
    isProduction && terser(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
};

export default libraryBundleConfig;
