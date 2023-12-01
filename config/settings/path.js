import * as nodePath from 'path';
export const rootFolder = nodePath.basename(nodePath.resolve());
const reportsFolder = './reports';
export const srcFolder = './src';
const buildFolder = './build';

export const paths = {
    build: nodePath.resolve(buildFolder),
	src: nodePath.resolve(srcFolder)
}

export const path = {
    build: {
        images: `${buildFolder}/content/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
        json: `${buildFolder}/json/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        html: `${buildFolder}/`
    },
    src: {
        images: `${srcFolder}/content/**/*.{jpg,png,webp}`,
        fonts: `${srcFolder}/content/fonts/*.*`,
        scss: `${srcFolder}/scss/style.scss`,
        svg: `${srcFolder}/content/**/*.svg`,
        svgsprite: `${srcFolder}/svg/*.svg`,
        files: `${srcFolder}/files/**/*.*`,
        json: `${srcFolder}/json/*.json`,
        pug: `${srcFolder}/pug/*.pug`,
        js: `${srcFolder}/js/app.js`,
        html: `${srcFolder}/*.html`
    },
    ftp: rootFolder,
    reportsFolder,
    buildFolder,
    rootFolder,
    srcFolder
}