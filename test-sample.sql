DROP DATABASE IF EXISTS testFoodData;
CREATE DATABASE testFoodData;
USE testFoodData;

-- Creating all tables
CREATE TABLE Users (
    uID INT NOT NULL, 
    accountType VARCHAR(5) NOT NULL, 
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    age INT,
    gender VARCHAR(1),
    weight FLOAT,
    height INT,
    desiredWeight FLOAT,
    caloricGoal INT,
    PRIMARY KEY(uID)
);

CREATE TABLE FoodIngredients(
    foodID INT NOT NULL,  
    uID INT NOT NULL,
    name VARCHAR(100) NOT NULL, 
    servingSize INT NOT NULL,
    calories INT NOT NULL,
    protein DECIMAL(4, 2) NOT NULL,
    carbohydrate DECIMAL(4, 2) NOT NULL,
    sugars DECIMAL(4, 2) NOT NULL,
    totalFat DECIMAL(4, 2) NOT NULL,
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

CREATE TABLE EatenIngredients(
    entryID INT NOT NULL AUTO_INCREMENT,
    foodID INT NOT NULL,  
    uID INT NOT NULL,
    date DATE,
    PRIMARY KEY(entryID),
    FOREIGN KEY (foodID) REFERENCES FoodIngredients(foodID),
    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE
);

CREATE TABLE EatenCustomMeals(
	entryID INT NOT NULL AUTO_INCREMENT,
    mealID INT NOT NULL REFERENCES FoodCustomMeals(mealID),  
    uID INT NOT NULL,
    date DATE,
    PRIMARY KEY(entryID),
    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE
);


-- Testing User Table
INSERT INTO Users VALUES (1, "Admin", "Admin", "Account", "admin1", "admin1", "admin1FoodTracker@gmmail.com", null, null, null, null, null, null);
INSERT INTO Users VALUES (2, "User", "Akshen", "Jasikumar", "akshen28", "akshen123", "akshen.jasikumar@gmmail.com", 21, "M", 160.0, 69, 150.0, 1800);
INSERT INTO Users VALUES (3, "User", "Yun", "Tao", "yunTao", "yun123", "yuntao200@gmail.com", 21, "M", 170.0, 71, 165.0, 2000);
-- Insert New Account
Select * FROM Users;
INSERT INTO Users VALUES (4, "User", "Sahi", "Abdullah", "sahiA12", "abd32", "abd270072@gmail.com", 21, "M", 140.0, 68, 150.0, 2200);
Select * FROM Users;
-- Delete Account
Select * FROM Users;
DELETE FROM Users WHERE uID = 3;
Select * FROM Users;
-- Update Account
Select * FROM Users;
UPDATE Users SET age = 22 WHERE uID = 4;
Select * FROM Users;


-- Testing FoodIngredients Table
INSERT INTO FoodIngredients VALUES(1176, 1, "Lettuce, raw, green leaf", 100, 15, 1.36, 2.87, 0.78, 0.2);
INSERT INTO FoodIngredients VALUES(1188, 1, "Bread, whole-wheat, pita", 100, 262, 9.80, 55.89, 2.87, 1.7);
INSERT INTO FoodIngredients VALUES(2009, 1, "Sweet potato, unprepared, raw", 100, 86, 6.10, 20.12, 4.18, 0.1);
INSERT INTO FoodIngredients VALUES(3757, 1, "Chicken breast, sliced, fat-free, oven-roasted", 100, 79, 16.79, 2.17, 0.10, 0.4);
INSERT INTO FoodIngredients VALUES (30, 1, 'Tomato', 100, 15, 1.36, 2.87, 0.78, 0.2);
INSERT INTO FoodIngredients VALUES (54, 1, 'Tomato Paste', 100, 15, 1.36, 2.87, 0.78, 0.2);
INSERT INTO FoodIngredients VALUES (8, 1, 'Macoroni', 100, 15, 1.36, 2.87, 0.78, 0.2);
INSERT INTO FoodIngredients VALUES (816, 1, 'Mozzerella Cheese', 100, 15, 1.36, 2.87, 0.78, 0.2);
INSERT INTO FoodIngredients VALUES (973, 1, 'Lettuce', 100, 15, 1.36, 2.87, 0.78, 0.2);
-- Insert New Ingredient
Select * FROM FoodIngredients;
INSERT INTO FoodIngredients VALUES (3758, 2, "roti", 100, 200, 0.1, 60, 5, 3);
Select * FROM FoodIngredients;
-- Delete Ingredient
Select * FROM FoodIngredients;
DELETE FROM FoodIngredients WHERE uID = 2 AND foodID = 3758;
Select * FROM FoodIngredients;
-- Update Ingredient
Select * FROM FoodIngredients;
UPDATE FoodIngredients SET name = "pita", servingSize =  150 WHERE foodID = 1188 AND uid = 1;
Select * FROM FoodIngredients;


-- Insert into FoodCustomMeals
INSERT INTO FoodCustomMeals VALUES (1, 30, 'Lasagna', 4, 1);
INSERT INTO FoodCustomMeals VALUES (1, 54, 'Lasagna', 3, 2);
INSERT INTO FoodCustomMeals VALUES (1, 8, 'Lasagna', 5, 2);
INSERT INTO FoodCustomMeals VALUES (2, 30, 'MacNCheese', 1, 2);
INSERT INTO FoodCustomMeals VALUES (2, 8, 'MacNCheese', 1, 2);
INSERT INTO FoodCustomMeals VALUES (3, 816, 'Burger', 2, 2);
INSERT INTO FoodCustomMeals VALUES (3, 973, 'Burger', 3, 2);
INSERT INTO FoodCustomMeals VALUES (4, 54, 'Salad', 1, 2);
SELECT * FROM FoodCustomMeals ORDER BY mealID;
-- Inserting an ingredient used in a meal
INSERT INTO FoodCustomMeals VALUES (4, 816, 'Salad', 1, 1);
SELECT * FROM FoodCustomMeals ORDER BY mealID;
-- Deleting A Meal
DELETE FROM FoodCustomMeals WHERE name = "Burger";
SELECT * FROM FoodCustomMeals ORDER BY mealID;
-- Update Meal
UPDATE FoodCustomMeals SET quantity = 2 WHERE foodID = 30 AND mealID = 1;
SELECT * FROM FoodCustomMeals ORDER BY mealID;


-- -- Testing EatenIngredients
-- -- PUT THE INSERTS HERE  <-----------------------------
-- -- Select how many times a user ate a particular ingredient given a date range
-- SELECT * FROM EatenIngredients WHERE date BETWEEN "2023-06-20 00:00:00" AND "2023-06-20 23:59:59" AND foodID = 254 AND uID = 2;
-- -- Marking Ingredient as Eaten
-- Select * FROM EatenIngredients;
-- INSERT INTO EatenIngredients VALUES (421, 5, GETDATE());
-- Select * FROM EatenIngredients;
-- -- Removing Ingredient as Eaten
-- Select * FROM EatenIngredients;
-- DELETE FROM EatenIngredients WHERE foodID = 421 AND date = "2023-06-21 20:01:33.817" AND uID = 5;
-- Select * FROM EatenIngredients;


-- -- Testing EatenCustomMeal
-- -- PUT THE INSERTS HERE <-----------------------------
-- -- Adding Meal eaten
-- Select * from EatenCustomMeal;
-- INSERT INTO EatenCustomMeal VALUES (25, 5, GETDATE());
-- Select * from EatenCustomMeal;
-- -- Deleting Meal eaten
-- Select * from EatenCustomMeal;
-- DELETE FROM EatenCustomMeal WHERE mealID = 25 AND date = "2023-06-23 20:01:33.817" AND uID = 5;
-- Select * from EatenCustomMeal;

