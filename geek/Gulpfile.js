var concatFile = require('gulp-concat'),
    gulp = require('gulp'),
    cssmin = minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    shell = require('gulp-shell'),
    amdOptimize = require('amd-optimize'),
    print = require('gulp-print'),
    usemin = require('gulp-usemin'),
    uncache = require('gulp-uncache'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    clean = require('gulp-clean'),
    revDel = require('rev-del'),
    gutil = require('gulp-util'),
    wait = require('gulp-wait'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify');

var css_assets = ["libs/assets/animate.css/animate.css",
    "libs/assets/font-awesome/css/font-awesome.min.css",
    "libs/assets/simple-line-icons/css/simple-line-icons.css",
    "libs/angular/angularjs-toaster/toaster.css",
    "css/font.css",
    "css/app.css",
    "bower_components/angular-datepicker/dist/angular-datepicker.min.css"
];

var general_js_assets = [
    "js/jquery.min.js",
    "js/bootstrap.min.js",
    "js/waypoints.min.js",
    "js/counterup.min.js",
    "js/inview.min.js",
    "js/easypiechart.js",
    "js/magnific-popup.min.js",
    "js/jquery.nav.js",
    "js/main.js",
];


gulp.task('concat_css', function() { 
    var stream = gulp.src(css_assets) 
        .pipe(concat('ezfly.min.css')) 
        .pipe(minifyCss()) 
        .pipe(rev()) 
        .pipe(gulp.dest('./dist/css')) 
        .pipe(rev.manifest()) 
        .pipe(rename({
            prefix: "css-",
        }))
        .pipe(gulp.dest('./dist')); 
    return stream;
});

gulp.task('process_general_js', function() { 
    gulp.src(general_js_assets) 
    .pipe(sourcemaps.init())
    .pipe(concat('required_lib.js')) 
    .pipe(rev()) 
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js')) 
    .pipe(rev.manifest()) 
    .pipe(rename({
        prefix: "js-nonminified-",
    }))
    .pipe(gulp.dest('./dist')); 

});

gulp.task('process_ng_libs', function() { 
    var stream = gulp.src(ng_libs) 
    
    
    .pipe(sourcemaps.init())
    .pipe(concat('ezfly_ng_libs.min.js')) 
    .pipe(rev()) 
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js')) 
    .pipe(rev.manifest()) 
    .pipe(rename({
        prefix: "js-ng-libs",
    }))
    
    .pipe(gulp.dest('./dist')); 
    return stream;
});

gulp.task('app_js', function() { 
    var stream = gulp.src(angular_js_assets) 
    .pipe(ngAnnotate())
    
    .pipe(sourcemaps.init())
    .pipe(concat('ezfly.min.js')) 
    .pipe(rev()) 
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js')) 
    .pipe(rev.manifest()) 
    .pipe(rename({
        prefix: "js-",
    }))
    
    .pipe(gulp.dest('./dist')); 
    return stream;
});

gulp.task('clean', function () {
  var stream = gulp.src(['./dist/js/ezfly*.js', 
    './dist/js/ezfly*.js.map', 
    './dist/js/required_lib*'], {read: false})
    .pipe(clean({force: true}));
  return stream;
});

gulp.task('update_revision', function() {
    var stream = gulp
        .src(['./dist/*.json', './index.template.html'])
        .pipe(revCollector({replaceReved: true})) 
        .pipe(rename({
            basename: "index",
            extname: ".html"
        }))
        .pipe(gulp.dest('./')); 
        return stream;
});

gulp.task('default', function(callback) {
  return runSequence(
    // 'clean',
    ['concat_css'],
    ['process_general_js'],
    ['update_revision'],
    "update_revision",
    callback
  );
});

var watcher = gulp.watch('js/**/*.js', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});