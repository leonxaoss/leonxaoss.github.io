const 	gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		axis = require('axis'),
		cssnano = require('gulp-cssnano'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		babel = require('gulp-babel'); // Бабель


gulp.task('sass',  function(){
	return gulp.src('scss/style.scss')
		.pipe(sass({use: [axis()]}))
		.pipe(cssnano())
		.pipe(autoprefixer(
			['> 0.5%', 'last 2 versions',"ie >= 9", 'Firefox >= 3'],
			{cascade: true,add: true }
		))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('css/'))
});

gulp.task('js',  function() {
	return gulp.src('src/*.js')
		.pipe(concat('main.min.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js/'))
});

gulp.task('watch', function() {
	gulp.watch('scss/*.scss', gulp.series('sass'));
	gulp.watch('src/*.js', gulp.series('js'));
});

