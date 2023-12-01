import jsonmin from 'gulp-json-minify';

export const json = () => {
    return app.gulp.src(app.path.src.json)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JSON',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(app.gulp.dest(app.path.build.json))
        .pipe(
            app.plugins.if(
                app.isBuild,
                jsonmin()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.rename({ suffix: '.min' })
            )
        )
        .pipe(app.gulp.dest(app.path.build.json))
}