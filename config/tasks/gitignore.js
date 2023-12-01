export const gitignore = () => {
    app.plugins.deleteAsync('./**/.gitkeep');
    if (!app.plugins.fs.existsSync('.gitignore')) {
        app.plugins.fs.writeFile('./.gitignore', '', cb);
        app.plugins.fs.appendFile('./.gitignore', 'package-lock.json\r\n', cb);
        app.plugins.fs.appendFile('./.gitignore', 'node_modules/\r\n', cb);
        app.plugins.fs.appendFile('./.gitignore', 'version.json\r\n', cb);
        app.plugins.fs.appendFile('./.gitignore', 'phpmailer/\r\n', cb);
        app.plugins.fs.appendFile('./.gitignore', '.gitignore\r\n', cb);
        app.plugins.fs.appendFile('./.gitignore', '**/*.zip\r\n', cb);
        app.plugins.fs.appendFile('./.gitignore', '**/*.rar\r\n', cb);
        app.plugins.fs.appendFile('./.gitignore', 'build/\r\n', cb);
    }
    return app.gulp.src(app.path.srcFolder)
}
function cb() { }