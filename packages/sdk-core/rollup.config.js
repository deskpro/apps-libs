import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const config = {
  input: 'src/index.js',
  output: { format: 'cjs' },
  watch: {
    chokidar: true,
    include: ['src/**', '../apps-components/lib']
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    babel({
      externalHelpers: false,
      exclude: ["node_modules/**"],
      plugins: ["external-helpers"]
    }),
    commonjs({
      include: "node_modules/**"
    })
  ]
};

export default config
