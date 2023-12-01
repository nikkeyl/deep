import plumber from 'gulp-plumber';
import { deleteAsync } from 'del';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import newer from 'gulp-newer';
import ifPlugin from 'gulp-if';
import fs from 'fs';

export const plugins = {
    if: ifPlugin,
    deleteAsync,
    plumber,
    notify,
    rename,
    newer,
    fs
}