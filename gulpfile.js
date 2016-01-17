var gulp = require('gulp');

var babel = require('gulp-babel');

gulp.task('html', function () {
    return gulp
        .src('src/**/*.html')
        .pipe(gulp.dest('dest'));
});

gulp.task('json', function () {
	return gulp
		.src('src/**/*.json')
		.pipe(gulp.dest('dest'));
});

gulp.task('babel', function () {
    return gulp
        .src('src/**/*.jsx')
        .pipe(babel())
        .pipe(gulp.dest('dest'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.jsx', ['babel']);
    gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/**/*.json', ['json']);
});

gulp.task('dest', ['html', 'json', 'babel']);
gulp.task('dev', ['dest', 'watch']);
gulp.task('default', ['dev']);