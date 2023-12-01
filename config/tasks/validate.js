import { htmlValidator } from "gulp-w3c-html-validator";

export const validator = () => {
    return app.gulp.src(`${app.path.build.html}*.min.html`)
        .pipe(htmlValidator.analyzer())
        .pipe(htmlValidator.reporter())
}