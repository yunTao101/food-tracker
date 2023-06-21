DROP DATABASE IF EXISTS foodData;
CREATE DATABASE foodData;
USE foodData;
CREATE TABLE users(uid INT NOT NULL PRIMARY KEY, name VARCHAR(155));
SELECT * FROM users 
WHERE uid = 8000;

create user 'cs348admin'@'localhost' identified by 'admin';
grant all on foodData.* to 'cs348admin'@'localhost';	
alter user 'cs348admin'@'localhost' identified with mysql_native_password by 'admin';

