const gulp = require('gulp')
const svgstore = require('gulp-svgstore')
const svgmin = require('gulp-svgmin')
const rename = require('gulp-rename')
const path = require('path')
const minimist = require('minimist')
const fs = require('fs')

//获取参数
let argv = minimist((process.argv.slice(2)));

//编译svg
gulp.task('combine',function(){
    return gulp.src(argv.s)
        .pipe(svgmin({
            plugins: [{
                removeDimensions: true
            }]
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename(argv.n + '.svg'))
        .pipe(gulp.dest(argv.d))
});

//svg -> js
const pre = '(function(){var svg = \''
const next = '\'; document.body.insertAdjacentHTML(\'afterBegin\', \'<div style=\"display:none;\"> \'+ svg + \'</div>\');}())'

gulp.task('default', ['combine'],(cb) => {
    //读取文件转js
    var readerStream = fs.createReadStream(path.resolve(argv.d , argv.n + '.svg'));
    var writerStream = fs.createWriteStream(path.resolve(argv.d , argv.n + '.js'));

    writerStream.write(pre,'utf8');
    readerStream.on('data',function (chunk) {
        writerStream.write(chunk,'utf8');
    })

    readerStream.on('end',function(){
        writerStream.write(next,'utf8');
    })

    writerStream.on('finish',function () {
        cb()
    })
});



