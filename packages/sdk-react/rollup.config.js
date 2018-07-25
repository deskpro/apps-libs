import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const config = {
  input: 'src/index.js',
  output: { format: 'cjs' },
  watch: {
    chokidar: true,
    include: ['src/**', '../apps-components/lib', '../sdk-core/lib']
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    babel({
      externalHelpers: false,
      exclude: [
        "node_modules/**",
        "../apps-components/**",
        "../apps-style/**",
        "../sdk-core/**"
      ],
    }),
    commonjs({
      include: ["node_modules/**", "../apps-components/**", "../sdk-core/**"],
    })
  ]
};

export default config
