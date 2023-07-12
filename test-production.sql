DROP DATABASE IF EXISTS testFoodData;
CREATE DATABASE testFoodData;
USE testFoodData;
SET SQL_SAFE_UPDATES = 0;

SELECT * FROM foodData.Production LIMIT 10;

CREATE TABLE Users (
    uID INT NOT NULL AUTO_INCREMENT, 
    accountType VARCHAR(5) NOT NULL, 
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    gender VARCHAR(1),
    age INT,
    weight FLOAT,
    height INT,
    desiredWeight FLOAT,
    caloricGoal INT,
    PRIMARY KEY(uID)
);

CREATE TABLE FoodIngredients(
    foodID INT NOT NULL AUTO_INCREMENT,  
    uID INT NOT NULL,
    name VARCHAR(1000) NOT NULL, 
    servingSize INT NOT NULL,
    calories INT NOT NULL,
    protein DECIMAL(5, 2) NOT NULL,
    carbohydrate DECIMAL(5, 2) NOT NULL,
    sugars DECIMAL(5, 2) NOT NULL,
    totalFat DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY (foodID),
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

-- Indexes
CREATE INDEX uIDIndex ON Users(uID);
CREATE INDEX loginCheckIndex ON Users(username, password); 
CREATE INDEX GetIngredientsIndex ON FoodIngredients(uID);
CREATE INDEX DeleteIngredientsIndex ON FoodIngredients(foodID, uID);
CREATE INDEX DeleteMealsIndex ON FoodCustomMeals(name); 
CREATE INDEX UpdateMealsIndex ON FoodCustomMeals(mealID, foodID); 
CREATE INDEX SelectEatenIndex ON EatenIngredients(uID, date); 
CREATE INDEX RemoveEatenIngredientsIndex ON EatenIngredients(foodID, uID, date);
CREATE INDEX RemoveEatenMealsIndex ON EatenCustomMeals(mealID, uID, date); 

-- Testing User Table
INSERT INTO Users (accountType, firstName, lastName, username, password, email, gender, age, weight, height, desiredWeight, caloricGoal) VALUES ("Admin", "Admin", "Account", "admin1", "admin1", "admin1FoodTracker@gmmail.com", null, null, null, null, null, null);
INSERT INTO Users (accountType, firstName, lastName, username, password, email, gender, age, weight, height, desiredWeight, caloricGoal) VALUES ("User", "Akshen", "Jasikumar", "akshen28", "akshen123", "akshen.jasikumar@gmmail.com", "M", 21, 160.0, 69, 150.0, 1800);
INSERT INTO Users (accountType, firstName, lastName, username, password, email, gender, age, weight, height, desiredWeight, caloricGoal) VALUES ("User", "Yun", "Tao", "yunTao", "yun123", "yuntao200@gmail.com", "M", 21, 170.0, 71, 165.0, 2000);
-- Insert New Account
Select * FROM Users;
INSERT INTO Users (accountType, firstName, lastName, username, password, email, gender, age, weight, height, desiredWeight, caloricGoal) VALUES ("User", "Sahi", "Abdullah", "sahiA12", "abd32", "abd270072@gmail.com", "M", 21, 140.0, 68, 150.0, 2200);
Select * FROM Users;
-- Delete Account
Select * FROM Users;
DELETE FROM Users WHERE uID = 3;
Select * FROM Users;
-- Update Account
Select * FROM Users;
UPDATE Users SET age = 22 WHERE uID = 4;
Select * FROM Users;
-- Login Check
SELECT * FROM Users WHERE username = "akshen28" AND password = "akshen123";

-- Remove 'g' character from production table columns 
UPDATE foodData.Production SET serving_size=REPLACE(serving_size, 'g', '');
UPDATE foodData.Production SET total_fat=REPLACE(total_fat, 'g', '');
UPDATE foodData.Production SET protein=REPLACE(protein, 'g', '');
UPDATE foodData.Production SET carbohydrate=REPLACE(carbohydrate, 'g', '');
UPDATE foodData.Production SET sugars=REPLACE(sugars, 'g', '');

-- Transfer production rows to FoodIngredients table
INSERT INTO FoodIngredients 
SELECT p.MyUnknownColumn + 1, 1, p.name, p.serving_size, p.calories, p.protein, p.carbohydrate, p.sugars, p.total_fat
FROM foodData.Production p;

-- Insert New Ingredient
Select * FROM FoodIngredients LIMIT 10;
INSERT INTO FoodIngredients (uID, name, servingSize, calories, protein, carbohydrate, sugars, totalFat) VALUES (2, "roti", 100, 200, 0.1, 60, 5, 3);
Select * FROM FoodIngredients ORDER BY foodID DESC LIMIT 10;
-- Delete Ingredient
Select * FROM FoodIngredients LIMIT 10;
DELETE FROM FoodIngredients WHERE uID = 2 AND foodID = 8788;
Select * FROM FoodIngredients ORDER BY foodID DESC LIMIT 10;
-- Update Ingredient
Select * FROM FoodIngredients WHERE foodID > 1180 AND foodID < 1190;
UPDATE FoodIngredients SET name = "pita", servingSize =  150 WHERE foodID = 1188 AND uid = 1;
Select * FROM FoodIngredients WHERE foodID > 1180 AND foodID < 1190;

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

-- Testing EatenIngredients
INSERT INTO EatenIngredients (foodID, uID, date) VALUES (30, 1, "2023-06-19");
INSERT INTO EatenIngredients (foodID, uID, date) VALUES (54, 2, "2023-06-20");
INSERT INTO EatenIngredients (foodID, uID, date) VALUES (8, 4, "2023-06-20");
-- Select what a user ate in a given date range
SELECT * FROM EatenIngredients WHERE date BETWEEN "2023-06-20" AND "2023-06-20" AND uID = 2;
-- Marking Ingredient as Eaten
Select * FROM EatenIngredients;
INSERT INTO EatenIngredients (foodID, uID, date) VALUES (973, 2, "2023-06-22");
Select * FROM EatenIngredients;
-- Removing Ingredient as Eaten
Select * FROM EatenIngredients;
DELETE FROM EatenIngredients WHERE foodID = 973 AND date = "2023-06-22" AND uID = 2;
Select * FROM EatenIngredients;

-- Testing EatenCustomMeals
INSERT INTO EatenCustomMeals (mealID, uID, date) VALUES (3, 2, "2023-06-19");
INSERT INTO EatenCustomMeals (mealID, uID, date) VALUES (1, 1, "2023-06-20");
INSERT INTO EatenCustomMeals (mealID, uID, date) VALUES (2, 4, "2023-06-21");
-- Adding Meal eaten
Select * from EatenCustomMeals;
INSERT INTO EatenCustomMeals (mealID, uID, date) VALUES (4, 4, "2023-06-21");
Select * from EatenCustomMeals;
-- Deleting Meal eaten
Select * from EatenCustomMeals;
DELETE FROM EatenCustomMeals WHERE mealID = 4 AND date = "2023-06-21" AND uID = 4;
Select * from EatenCustomMeals;

-- Create Progress Info table
CREATE TABLE ProgressInfo(
	uID INT NOT NULL,
    date DATE NOT NULL,
	calories INT NOT NULL,
    protein DECIMAL(5, 2) NOT NULL,
    carbohydrate DECIMAL(5, 2) NOT NULL,
    totalFat DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY(uID, date),
    FOREIGN KEY (uID) REFERENCES Users(uID));
    
-- Indexes 
CREATE INDEX DiaryIndex ON ProgressInfo(uID, date);
CREATE INDEX ProgressIndex ON ProgressInfo(uID, date, calories); 

-- Procedure to insert and update rows in ProgressInfo when foods are eaten
DELIMITER //
CREATE PROCEDURE afterEatenIngredientInsert(newFoodID INT, userID INT, addedDate DATE)
	BEGIN
		IF ((SELECT COUNT(*) FROM ProgressInfo WHERE date = addedDate) = 0) THEN
			BEGIN
			INSERT INTO ProgressInfo VALUES (userID, addedDate, 0, 0.00, 0.00, 0.00);
            UPDATE ProgressInfo p, FoodIngredients i
            SET p.calories=i.calories, p.protein = i.protein, p.carbohydrate = i.carbohydrate, p.totalFat = i.totalFat
            WHERE i.foodID = newFoodID AND p.uID = userID AND p.date = addedDate;
			END;
		ELSE
			UPDATE ProgressInfo p, FoodIngredients i
            SET p.calories=p.calories + i.calories, p.protein = p.protein + i.protein,
            p.carbohydrate = p.carbohydrate + i.carbohydrate, p.totalFat = p.totalFat + i.totalFat 
            WHERE i.foodID = newFoodID AND p.uID = userID AND addedDate = p.date;
        END IF;
	END//
DELIMITER ;

-- Procedure to update rows in ProgressInfo when ingredients are removed from eaten
DELIMITER //
CREATE PROCEDURE afterEatenIngredientDelete(newFoodID INT, userID INT, addedDate DATE)
	BEGIN
		UPDATE ProgressInfo p, FoodIngredients i
            SET p.calories=p.calories - i.calories, p.protein = p.protein - i.protein,
            p.carbohydrate = p.carbohydrate - i.carbohydrate, p.totalFat = p.totalFat - i.totalFat 
            WHERE i.foodID = newFoodID AND p.uID = userID AND addedDate = p.date;
	END//
DELIMITER ;

-- Empty ProgressInfo table
SELECT * FROM ProgressInfo ORDER BY date;

-- Check two ingredients as eaten and update ProgressInfo table with 2 new rows
INSERT INTO EatenIngredients (foodID, uID, date) VALUES (2009, 2, "2023-06-22");
INSERT INTO EatenIngredients (foodID, uID, date) VALUES (973, 2, "2023-08-22");
CALL afterEatenIngredientInsert(2009, 2, "2023-06-22");
CALL afterEatenIngredientInsert(973, 2, "2023-08-22");
SELECT * FROM ProgressInfo ORDER BY date;

-- Add another ingredient to EatenIngredients and see updated row in ProgressInfo
INSERT INTO EatenIngredients (foodID, uID, date) VALUES (973, 2, "2023-08-22");
CALL afterEatenIngredientInsert(973, 2, "2023-08-22");
SELECT * FROM ProgressInfo ORDER BY date;

-- Delete an ingredient from EatenIngredient and see updated row in ProgressInfo
DELETE FROM EatenIngredients WHERE foodID = 2009 AND date = "2023-06-22" AND uID = 2;
CALL afterEatenIngredientDelete(2009, 2, "2023-06-22");
SELECT * FROM ProgressInfo ORDER BY date;

-- Procedure to insert and update rows in ProgressInfo when a meal is eaten by a user
DELIMITER //
CREATE PROCEDURE afterEatenCustomMealInsert(newMealID INT, userID INT, addedDate DATE)
	BEGIN
		IF ((SELECT COUNT(*) FROM ProgressInfo WHERE date = addedDate) = 0) THEN
			BEGIN
            INSERT INTO ProgressInfo VALUES (userID, addedDate, 0, 0.00, 0.00, 0.00);
            UPDATE ProgressInfo p, (SELECT SUM(i.calories) as calories, SUM(i.protein) as protein, SUM(i.carbohydrate) as carb, SUM(i.totalFat) as fat FROM FoodIngredients i, FoodCustomMeals c WHERE c.mealID = newMealID AND c.foodID = i.foodID) as t
            SET p.calories=t.calories, p.protein = t.protein, p.carbohydrate = t.carb, p.totalFat = t.fat
            WHERE p.uID = userID AND p.date = addedDate;
			END;
        ELSE
            UPDATE ProgressInfo p, (SELECT SUM(i.calories) as calories, SUM(i.protein) as protein, SUM(i.carbohydrate) as carb, SUM(i.totalFat) as fat FROM FoodIngredients i, FoodCustomMeals c WHERE c.mealID = newMealID AND c.foodID = i.foodID) as t
            SET p.calories=p.calories + t.calories, p.protein = p.protein + t.protein,
            p.carbohydrate = p.carbohydrate + t.carb, p.totalFat = p.totalFat + t.fat
            WHERE p.uID = userID AND p.date = addedDate;
        END IF;
	END//
DELIMITER ;    

-- Procedure to update rows in ProgressInfo when meal is removed from eaten
DELIMITER //
CREATE PROCEDURE beforeEatenCustomMealDelete(newMealID INT, userID INT, addedDate DATE)
	BEGIN
		UPDATE ProgressInfo p, (SELECT SUM(i.calories) as calories, SUM(i.protein) as protein, SUM(i.carbohydrate) as carb, SUM(i.totalFat) as fat FROM FoodIngredients i, FoodCustomMeals c WHERE c.mealID = newMealID AND c.foodID = i.foodID) as t
		SET p.calories=p.calories - t.calories, p.protein = p.protein - t.protein,
		p.carbohydrate = p.carbohydrate - t.carb, p.totalFat = p.totalFat - t.fat
		WHERE p.uID = userID AND p.date = addedDate;
	END//
DELIMITER ;

-- User adds meal as eaten
INSERT INTO EatenCustomMeals (mealID, uID, date) VALUES (4, 4, "2023-06-21");
CALL afterEatenCustomMealInsert(4, 4, "2023-06-21");
SELECT * FROM ProgressInfo ORDER BY date;

-- User removes meal from eaten
CALL beforeEatenCustomMealDelete(4, 4, "2023-06-21");
DELETE FROM EatenCustomMeals WHERE mealID = 4 AND date = "2023-06-21" AND uID = 4;
SELECT * FROM ProgressInfo ORDER BY date;

-- Get calories and macros consumed by a user on a specific day
DELIMITER //
CREATE PROCEDURE currentCalories(IN userID INT, IN date DATE, OUT currentCal INT)
	BEGIN
		SELECT p.calories FROM ProgressInfo p WHERE p.date = date;
	END//
CREATE PROCEDURE currentProtein(IN userID INT, IN date DATE, OUT currentPro INT)
	BEGIN
		SELECT p.protein FROM ProgressInfo p WHERE p.date = date;
	END//
CREATE PROCEDURE currentCarbohydrate(IN userID INT, IN date DATE, OUT currentCarb INT)
	BEGIN
		SELECT p.carbohydrate FROM ProgressInfo p WHERE p.date = date;
	END//
CREATE PROCEDURE currentTotalFat(IN userID INT, IN date DATE, OUT currentFat INT)
	BEGIN
		SELECT p.totalFat FROM ProgressInfo p WHERE p.date = date;
	END//
DELIMITER ;

-- Get user's daily calorie goal
DELIMITER //
CREATE PROCEDURE dailyCalorieGoal(IN userID INT, OUT calorieGoal INT)
	BEGIN
		SELECT u.caloricGoal FROM Users u WHERE u.uID = userID;
	END//
DELIMITER ;

-- Reset ProgressInfo 
DELETE FROM ProgressInfo;

-- Insert values into Progress Info
INSERT INTO ProgressInfo VALUES (1, "2023-01-01", 1565, 79.13, 11.3, 60.4); 
INSERT INTO ProgressInfo VALUES (1, "2023-01-22", 3450, 93.42, 8.4, 40.5);
INSERT INTO ProgressInfo VALUES (1, "2023-03-21", 2382, 87.43, 10.4, 37.6); 
INSERT INTO ProgressInfo VALUES (1, "2023-04-09", 5374, 234.66, 12.3, 52.3); 
INSERT INTO ProgressInfo VALUES (1, "2023-05-04", 2335, 433.66, 13.7, 131.5); 
INSERT INTO ProgressInfo VALUES (1, "2023-06-17", 1056, 101.66, 10.0, 50.5); 
INSERT INTO ProgressInfo VALUES (1, "2023-07-11", 233, 43.66, 1.7, 11.5);
INSERT INTO ProgressInfo VALUES (1, "2023-08-10", 1056, 101.66, 10.0, 50.5); 
INSERT INTO ProgressInfo VALUES (1, "2023-08-11", 233, 43.66, 1.7, 11.5);

SELECT * FROM ProgressInfo ORDER BY date;

-- Declare procedures for weekly, monthly, yearly calorie counts
DELIMITER //
CREATE PROCEDURE weeklyCalorieCount(userID INT, sunday DATE, saturday DATE)
	BEGIN
		SELECT date, calories FROM ProgressInfo WHERE uID = userID AND date >= sunday AND date <= saturday;
	END//

CREATE PROCEDURE monthlyCalorieCount(userID INT, month INT, year INT)
	BEGIN
		SELECT DAY(date), calories FROM ProgressInfo WHERE uID = userID AND MONTH(date) = month AND YEAR(date) = year;
	END//

CREATE PROCEDURE yearlyCalorieCount(userID INT, year INT)
	BEGIN
		SELECT MONTH(date), AVG(calories) FROM ProgressInfo WHERE uID = userID AND YEAR(date) = year GROUP BY MONTH(date);
	END//
DELIMITER ;

-- Get the average calorie consumption of all months tracked in 2023
CALL yearlyCalorieCount(1, 2023);
-- get the monthly calorie consumption of all days tracked in January 2023
CALL monthlyCalorieCount(1, 1, 2023);
-- Get the daily calorie consumption of all days in the week of 2023-08-05 to 2023-08-11
CALL weeklyCalorieCount(1, "2023-08-05", "2023-08-11");