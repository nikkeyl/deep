import gulp from 'gulp';
import { plugins } from './config/settings/plugins.js';
import { path } from './config/settings/path.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './config/tasks/fonts.js';
import { accessibility } from './config/tasks/accessibility.js';
import { gitignore } from './config/tasks/gitignore.js';
import { validator } from './config/tasks/validate.js';
import { images } from './config/tasks/images.js';
import { sprite } from './config/tasks/sprite.js';
import { jsDev } from './config/tasks/js-dev.js';
import { reset } from './config/tasks/reset.js';
import { html } from './config/tasks/html.js';
import { scss } from './config/tasks/scss.js';
import { json } from './config/tasks/json.js';
import { zip } from './config/tasks/zip.js';
import { ftp } from './config/tasks/ftp.js';
import { js } from './config/tasks/js.js';

export const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fontsStyle);
export const build = gulp.series(fonts, jsDev, js, gulp.parallel(html, scss, json, images), gulp.parallel(validator, accessibility), zip);
export const runFTP = gulp.series(build, ftp);
const dev = gulp.series(fonts, gitignore);

export { sprite }

global.app = {
    isNoWebP: !process.argv.includes('--nowebp'),
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    plugins,
    path,
    gulp
}

gulp.task('default', dev);