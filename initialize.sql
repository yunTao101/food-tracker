DROP DATABASE IF EXISTS foodData;
CREATE DATABASE foodData;
USE foodData;
CREATE TABLE Users (
    uID INT NOT NULL AUTO_INCREMENT, 
    accountType VARCHAR(5) NOT NULL, 
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    age INT,
    gender VARCHAR(1),
    weight INT,
    height VARCHAR(4),
    desiredWeight INT,
    caloricGoal INT,
    PRIMARY KEY(uid)
);

CREATE TABLE FoodIngredients(
    foodID INT NOT NULL AUTO_INCREMENT,  
    uID INT NOT NULL,
    name VARCHAR(200) NOT NULL, 
    servingSize INT NOT NULL,
    calories INT NOT NULL,
    protein DECIMAL(5, 2) NOT NULL,
    carbohydrate DECIMAL(5, 2) NOT NULL,
    sugars DECIMAL(5, 2) NOT NULL,
    totalFat DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY(foodID),
    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE
);

CREATE TABLE FoodCustomMeals(
    mealID INT NOT NULL, 
    foodID INT NOT NULL, 
    name VARCHAR(100),
    quantity INT, 
    uID INT NOT NULL,
    PRIMARY KEY(foodID, mealID),
    FOREIGN KEY (foodID) REFERENCES FoodIngredients(foodID),
    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE
);

CREATE TABLE EatenCustomMeals(
      mealID INT NOT NULL REFERENCES FoodCustomMeals(mealID) ,
      uID INT NOT NULL,
      entryID INT NOT NULL AUTO_INCREMENT,
      date DATE,
PRIMARY KEY(entryID),
FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE);

CREATE TABLE EatenIngredients(
      foodID INT NOT NULL,
      uID INT NOT NULL,
      entryID INT NOT NULL AUTO_INCREMENT,
      date DATE,
PRIMARY KEY(entryID),
FOREIGN KEY (foodID) REFERENCES FoodIngredients(foodID) ON DELETE CASCADE,
FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE);

select * from FoodCustomMeals;
select * from FoodIngredients;
select count(*) from FoodIngredients;
select * from Users;
INSERT INTO Users VALUES (1, "Admin", "Admin", "Account", "admin1", "admin1", "admin1FoodTracker@gmmail.com", null, null, null, null, null, null);
INSERT INTO Users VALUES (2, "User", "User1", "User1", "user1", "user1", "user1@gmail.com", 21, "F", 130, 160, 125, 1800);
create user 'cs348admin'@'localhost' identified by 'admin';
grant all on foodData.* to 'cs348admin'@'localhost';	
alter user 'cs348admin'@'localhost' identified with mysql_native_password by 'admin';

