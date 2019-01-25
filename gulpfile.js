var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber');

gulp.task('styles', function () {
	return gulp.src('./sass/styles.scss') // Ścieżka z naszym głównym plikiem SASS (wyjściowa).
		.pipe(plumber()) // 'Łata nam dziury' - czyli w przypadku błędów np. z literówek, nasze zadanie 'gulp watch' się nie przerwie
		.pipe(sourcemaps.init())
		.pipe(sass.sync()) // Komenda, która pozwoli nam kompilować plik SASS na zwykły CSS.
		.pipe(autoprefixer({ // Automatycznie dodaje prefixy do reguł, aby projekt poprawnie się wyświetlał w starszych przeglądarkach.
			browsers: ['last 5 version']
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./css')) // Ścieżka, gdzie Gulp powinien 'wypluć' nasz przekompilowany plik CSS.
});

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', ['styles']); // Gdy nastąpi jakakolwiek zmiana w plikach z folderu './sass/', Gulp automatycznie przekompiluje dla nas zadanie 'styles'.
});
