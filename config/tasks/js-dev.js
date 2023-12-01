import webPackConfig from '../webpack/webpack.prod.js';
import TerserPlugin from 'terser-webpack-plugin';
import { paths } from '../settings/path.js';
import webpack from 'webpack-stream';

let webPackConfigBeautify = Object.assign({}, webPackConfig);

webPackConfigBeautify.optimization = {
	minimizer: [new TerserPlugin({
		extractComments: false,
        terserOptions: {
            keep_classnames: true,
            compress: {
				defaults: false,
				unused: true
            },
            format: {
				beautify: true
			},
            keep_fnames: true,
			ecma: undefined,
            warnings: false,
            toplevel: false,
            mangle: false,
			module: false,
			parse: {}
		}
	})]
}
webPackConfigBeautify.output = {
	path: paths.build,
	filename: 'app.js',
	publicPath: '/'
}

export const jsDev = () => {
	return app.gulp.src(app.path.src.js)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>'
			}))
		)
		.pipe(webpack({
			config: webPackConfigBeautify
		}))
		.pipe(app.gulp.dest(app.path.build.js));
}