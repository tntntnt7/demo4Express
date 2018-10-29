const gulp = require('gulp')
const shell = require('gulp-shell')
const del = require('del')
const gulp_tslint = require('gulp-tslint')

gulp.task('default', ['start'])

gulp.task('start', ['build'], shell.task(['yarn run tsc-dev']))

gulp.task('test', ['build'], shell.task(['yarn run test-dev']))

gulp.task('build', ['clean'], shell.task(['yarn run tsc-production']))

gulp.task('clean', ['tslint'], () => {
  return del('./build', { force: true })
})

gulp.task('tslint', () => {
  return gulp.src(['./src/**/*.ts'])
    .pipe(gulp_tslint({
      formatter: "verbose"
      // configuration: "./tslint.json"
    }))
    .pipe(gulp_tslint.report({
      emitError: true,
      summarizeFailureOutput: true
    }));
});
