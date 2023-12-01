import access from 'gulp-wcag-accessibility';

export const accessibility = () => {
    return app.gulp.src(`${app.path.build.html}*.min.html`)
        .pipe(access({
            accessibilityLevel: 'WCAG2AAA',
            maxBuffer: '1024*1024',
            force: true,
            verbose: false,
            reportLevels: {
                notice: false,
                warning: true,
                error: true
            }
        }))
}