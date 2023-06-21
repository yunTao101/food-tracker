DROP DATABASE IF EXISTS foodData;
CREATE DATABASE foodData;
USE foodData;
CREATE TABLE users(uid DECIMAL(3, 0) NOT NULL PRIMARY KEY, name VARCHAR(55));
SELECT * FROM users;

create user 'cs348admin'@'localhost' identified by 'admin';
grant all on foodData.* to 'cs348admin'@'localhost';	
alter user 'cs348admin'@'localhost' identified with mysql_native_password by 'admin';

