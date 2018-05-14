import babelrc from 'babelrc-rollup';
import babel from 'rollup-plugin-babel';
import image from 'rollup-plugin-image';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
    },
    {
      file: 'dist/cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [
    image(),
    babel(
      babelrc({
        addModuleOptions: false,
        findRollupPresets: true,
        addExternalHelpersPlugin: false,
      }),
    ),
  ],
};
