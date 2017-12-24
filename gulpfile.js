'use strict';

const path = require('path');
const gulp = require('gulp');
const fs = require('fs-extra');
const jsdoc2md = require('jsdoc-to-markdown');

gulp.task('generateDocs', () => {
  return jsdoc2md.render({
    'no-cache': true,
    separators: true,
    files: ['./index.js', './lib/*.js']
  })
    .then((output) => {
      return fs.writeFile(path.join(__dirname, './docs/api.md'), output, 'utf-8');
    });
});
