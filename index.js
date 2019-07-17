#!/usr/bin/env node
const program = require('commander')
const version = require('./package').version
const exec = require('child_process').exec

program.version(version)
    .usage('[options] <file ...>')
    .option('-s , --src <src>','svg字体文件路径')
    .option('-d , --dist <dist>','编译的目标路径' ,'dist')
    .option('-n , --name <name>', '目标文件名称' , 'dist')
    .parse(process.argv);

//gulp
exec('gulp --gulpfile gulpfile.js -s '+ program.src +'  -d '+ program.dist + ' -n ' + program.name);
