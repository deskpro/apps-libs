import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const env = process.env.NODE_ENV
const config = {
  input: 'src/index.js',
  output: { format: env },
  external: ['symbol-observable'],
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      externalHelpers: true,
      plugins: ['external-helpers'],
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};

export default config
