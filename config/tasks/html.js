import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlmin from 'gulp-htmlmin';

export const html = () => {
    return app.gulp.src(`${app.path.build.html}*.html`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(
            app.plugins.if(
                app.isNoWebP,
                webpHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js'
                        ]
                    },
                    'output': {
                        'file': 'config/log/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(
            app.plugins.if(
                app.isBuild,
                htmlmin({
                    collapseWhitespace: true,
                    removeComments: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.rename({ suffix: '.min' })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
}