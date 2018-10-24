var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),    
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber');      // Załączamy wszystko to co instalowalismy z NPMa

gulp.task('styles', function () {
	return gulp.src('./sass/styles.scss') // Ścieżka z naszym głównym plikiem SASS (wyjściowa). (czyli tam gdzie gulp ma rozpoczac prace)
		.pipe(plumber()) // 'Łata nam dziury' - czyli w przypadku błędów np. z literówek, nasze zadanie 'gulp watch' się nie przerwie
		.pipe(sourcemaps.init())    // Pokazujemy GDZI JEST ŹRÓDŁO MAPY dla plikow css dla przegladarek, czyli tzw SOURCEMAPY
		.pipe(sass.sync()) // Komenda, która pozwoli nam kompilować plik SASS na zwykły CSS.
		.pipe(autoprefixer({ // Automatycznie dodaje prefixy do reguł, aby projekt poprawnie się wyświetlał w starszych przeglądarkach.
			browsers: ['last 5 version']    // czyli wspieraj wszystkie przegladarki 5 wersji wstecz (-0-; -webkit- itd)
		}))
		.pipe(sourcemaps.write('./'))   // Tutaj pokazujemy GDZIE MAJA SIE POJAWIC pliki z SOURCEMAP
		.pipe(gulp.dest('./css')) // Ścieżka, gdzie Gulp powinien 'wypluć' nasz przekompilowany plik CSS. (katalog tworzony autmoatcyznie jak go nie ma)
});

gulp.task('watch', function () {    // Zuwaz ze jest to kolejne zadanie, takie jak u góry tylko pod inną nazwą "watch" a nie "styles"
	gulp.watch('./sass/**/*.scss', ['styles']); // Gdy nastąpi jakakolwiek zmiana w plikach z folderu './sass/', Gulp automatycznie przekompiluje dla nas zadanie 'styles'.
});

/* 
Juz majac okodowane linijki 
gulp.src('./sass/styles.scss')
.pipe(sass.sync())
.pipe(gulp.dest('./css'))

i wywolujac w konsoli polecenie "gulp styles", zadziala nam kompilacja kodu sass do css

--------
sourcemaps = require('gulp-sourcemaps'),

cały ten moduł powoduje to, że gdyby nie on to przeglądarka pokazywałaby nam że ŹRÓŁÓWE daneh naszych plikow css
są właśnie w plikach css    "style.css"
ALE DZIEKI TEMU MODUŁOWI
tworzymy mapę dla styli i przeglądarka wskaże nam POPRAWNE źródło właściwego pliku źródłowego czyli SCSS !
czyli w pliku "style.scss"

POJAWIA NAM SIE DODATKOWY PLIK styles.css.map !!! który właśnie mapuje style.css ma style.scss

*/