import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: [
    'react',
    'react-dom',
    'styled-components',
    'framer-motion',
    'dayjs',
    'clsx',
    'react-hook-form',
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
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
      rootDir: './src',
    }),
    postcss({
      extract: 'styles.css',
      minimize: isProduction,
      sourceMap: true,
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
