var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('databaseInit', shell.task([
  'mysql -u root -e "create database wechat;"'
]))

gulp.task('tablesInit', shell.task([
  'mysql -u root -e "use wechat; create table messages (username varchar(30), room varchar(30), message varchar(300));"', 
  'mysql -u root -e "use wechat; create table userpassword (username varchar(30), password varchar(300));"'
]))

gulp.task('roomInit', shell.task([
  'mysql -u root -e "use wechat; insert into messages (username, room, message) values(\'ron\', \'weather\', \'what a day!\')"', 
  'mysql -u root -e "use wechat; insert into messages (username, room, message) values(\'ron\', \'weather\', \'what a lovely, lovely day!!\')"', 
  'mysql -u root -e "use wechat; insert into messages (username, room, message) values(\'joe\', \'weather\', \'...\')"', 
  'mysql -u root -e "use wechat; insert into messages (username, room, message) values(\'ron\', \'weather\', \'witness me!!\')"', 
  'mysql -u root -e "use wechat; insert into messages (username, room, message) values(\'joe\', \'weather\', \'mediocre...\')"'
]))

gulp.task('deleteDB', shell.task([
  'mysql -u root -e "drop database wechat"'
]))

gulp.task('default', ['databaseInit', 'tablesInit', 'roomInit']);

