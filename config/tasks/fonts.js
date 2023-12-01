import ttf2woff2 from 'gulp-ttf2woff2';
import fonter from 'gulp-fonter';

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/content/fonts/*.otf`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/content/fonts/`))
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/content/fonts/*.ttf`)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.gulp.src(`${app.path.srcFolder}/content/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
}

export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/settings/fonts/fonts.scss`;
    app.plugins.fs.unlink(fontsFile, cb);
    app.plugins.fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!app.plugins.fs.existsSync(fontsFile)) {
                app.plugins.fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        app.plugins.fs.appendFile(fontsFile, `@font-face {\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-family: '${fontName}';\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n\tfont-display: swap;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            }
        } else {
            app.plugins.fs.unlink(fontsFile, cb)
        }
    });
    return app.gulp.src(app.path.srcFolder);
    function cb() { }
}