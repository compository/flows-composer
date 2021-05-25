import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [{ dir: 'dist', format: 'es', sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash-es')
  external: [
    Object.keys(pkg.dependencies).filter(key => !key.includes('rete')),
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    replace({
      'document.elementFromPoint(e.clientX, e.clientY)': 'e.composedPath()[0]',
      'function ___$insertStyle(': 'function __(',
      '___$insertStyle(': 'export const styles = (',
      delimiters: ['', ''],
    }),
    postcss({
      inject: false,
    }),
    postcssLit(),
    typescript({}),
    resolve({
      dedupe: ['lit-html', 'lit-element'],
    }),
    commonjs({
      include: [],
    }),
  ],
};
