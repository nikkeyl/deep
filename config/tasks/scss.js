import groupCssMediaQueries from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import comb from 'gulp-csscomb';

export const scss = () => {
    return app.gulp.src(`${app.path.build.css}style.css`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            })))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    cascade: true,
                    grid: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isNoWebP,
                webpcss(
                    {
                        noWebpClass: '.no-webp',
                        webpClass: '.webp'
                    }
                )
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                comb()
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(app.plugins.rename({ suffix: '.min' }))
        .pipe(app.gulp.dest(app.path.build.css))
}