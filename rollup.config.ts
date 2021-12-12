import tsPlugin from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
	input: 'src/modules/AutomataGrid.tsx',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		tsPlugin(),
	],
};