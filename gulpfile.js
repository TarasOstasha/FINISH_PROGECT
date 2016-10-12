var gulp 		 = require("gulp"),
	less 		 = require("gulp-less"),
	nano 		 = require("gulp-cssnano"),
	rename		 = require("gulp-rename"),
	browserSync  = require("browser-sync"),
	imagemin	 = require("gulp-imagemin"),
	pngquant	 = require("imagemin-pngquant"),
	concat		 = require('gulp-concat'),
	uglify		 = require('gulp-uglify'),
	addSrc		 = require('gulp-add-src'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task("less", function() {
	return gulp.src("./src/styles/style.less")
		.pipe(less())
		.pipe(autoprefixer(['last 15 versions', 'ie 8', 'ie 7'], { cascade: true}))
		.pipe(nano())
		// .pipe(rename({suffix: 'min'})) - таким чином добавляється суфікс
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("bower-css", function() {
	return gulp.src([
			"src/bower/bootstrap/dist/css/bootstrap.css",
			"src/bower/toastr/toastr.min.css",
			"src/bower/datatables.net-bs/css/dataTables.bootstrap.css"
		])
	.pipe(nano())
	.pipe(concat("bower.min.css"))
	.pipe(gulp.dest('dist/css'));
});

gulp.task("images", function() {
	return gulp.src("./src/images/**/*.{jpg,png}")
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			une: [pngquant()]
		}))
		.pipe(gulp.dest("dist/images"))
});

gulp.task("fonts", function() {
	return gulp.src([
		"src/bower/bootstrap/dist/fonts/*.*",
		"src/fonts/**/*.*"
	])
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task("html", function() {
	return gulp.src("src/**/*.html")
		.pipe(gulp.dest("dist"));
});

gulp.task("data", function() {
	return gulp.src("src/data/**/*.json")
		.pipe(gulp.dest("dist/data"))
});

gulp.task('bower-js', function() {
	return gulp.src([
		"src/bower/bootstrap/dist/js/bootstrap.js",
		"src/bower/toastr/toastr.js",
		"src/bower/datatables.net/js/jquery.dataTables.js",
		"src/bower/datatables.net-bs/js/dataTables.bootstrap.js"
				
	])
	.pipe(addSrc.prepend("src/bower/jquery/dist/jquery.js"))
	.pipe(concat('bower.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('main-js', function() {
	return gulp.src([
		"src/scripts/main.js",
		"src/scripts/blog.js",
		"src/scripts/scrollbtn.js"
	])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'less', 'main-js'], function() {
	gulp.watch('src/styles/**/*.less', ['less']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch('dist/*.html', browserSync.reload);
	gulp.watch('src/scripts/*.js', ['main-js']);
	gulp.watch('dist/js/*.js', browserSync.reload);
	// gulp.watch('src/scripts/*.js', ['js'-тут має бути назва таску]);
	// gulp.watch('dist/*тут вказати папку де буде мій скрипт.js', browserSync.reload); - тут і зверху в масиві має бути мій файл js
});

gulp.task('default', ['html', 'images', 'less', 'watch', 'bower-js', 'fonts', 'bower-css', 'main-js']);