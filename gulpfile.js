const gulp = require('gulp')
const shell = require('gulp-shell')
const del = require('del')
const gulp_tslint = require('gulp-tslint')
const path = require('path')
const fs = require('fs-extra')

gulp.task('default', ['start'])

gulp.task('start', ['build'], shell.task(['yarn run tsc-dev']))

gulp.task('build', ['config'], shell.task(['yarn run tsc-production']))

gulp.task('config', ['clean'], () => {
	const srcFolder = path.join(__dirname, './src')
	const buildFolder = path.join(__dirname, './build')
	const packageConfig = path.join(__dirname, './package.json')

	fs.mkdirsSync(buildFolder + '/common/assets/uploads')
	fs.copySync(srcFolder + '/common/assets', buildFolder + '/common/assets')

	const pkgConfig = fs.readJSONSync(packageConfig)
	delete pkgConfig.devDependencies
	delete pkgConfig.scripts
	fs.outputJSON(buildFolder + '/package.json', pkgConfig)

	return
})

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
