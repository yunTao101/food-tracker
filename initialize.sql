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
    FOREIGN KEY (foodID) REFERENCES FoodIngredients(foodID) ON DELETE CASCADE,
    FOREIGN KEY (uID) REFERENCES Users(uID) ON DELETE CASCADE
);

CREATE TABLE EatenIngredients(
    entryID INT NOT NULL AUTO_INCREMENT,
    foodID INT NOT NULL,  
    uID INT NOT NULL,
    date DATE,
    PRIMARY KEY(entryID),
    FOREIGN KEY (foodID) REFERENCES FoodIngredients(foodID) ON DELETE CASCADE,
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

-- Procedure to recalculate progress info
DELIMITER //
CREATE PROCEDURE recalculateProgressInfo(userID INT, selectedDate DATE)
    BEGIN
    UPDATE ProgressInfo p, (SELECT SUM(i.calories * quantity) as calories, SUM(i.protein * quantity) as protein, SUM(i.carbohydrate * quantity) as carb, SUM(i.totalFat * quantity) as fat FROM FoodIngredients i, FoodCustomMeals c, EatenCustomMeals e WHERE e.mealID = c.mealID AND c.foodID = i.foodID AND e.uID = userID) as t,
    (SELECT SUM(i.calories) as calories, SUM(i.protein) as protein, SUM(i.carbohydrate) as carb, SUM(i.totalFat) as fat FROM FoodIngredients i, EatenIngredients e WHERE e.foodID = i.foodID AND e.uID = userID) as q
    SET p.calories = t.calories + q.calories, p.protein = t.protein + q.protein,
        p.carbohydrate = t.carb + q.carb, p.totalFat = t.fat + q.fat
    WHERE p.uID = userID AND p.date = selectedDate;
    END//
DELIMITER ; 

-- Procedure to insert and update rows in ProgressInfo when foods are eaten
DELIMITER //
CREATE PROCEDURE afterEatenIngredientInsert(newFoodID INT, userID INT, addedDate DATE)
	BEGIN
		IF ((SELECT COUNT(*) FROM ProgressInfo WHERE date = addedDate AND uid = userID) = 0) THEN
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
CREATE PROCEDURE afterEatenIngredientDelete(newFoodID INT, userID INT, addedDate DATE, foodQuantity INT)
	BEGIN
		UPDATE ProgressInfo p, FoodIngredients i
            SET p.calories=p.calories - (i.calories * foodQuantity), p.protein = p.protein - (i.protein * foodQuantity),
            p.carbohydrate = p.carbohydrate - (i.carbohydrate * foodQuantity), p.totalFat = p.totalFat - (i.totalFat * foodQuantity)
            WHERE i.foodID = newFoodID AND p.uID = userID AND addedDate = p.date;
	END//
DELIMITER ;

-- Procedure to insert and update rows in ProgressInfo when a meal is eaten by a user
DELIMITER //
CREATE PROCEDURE afterEatenCustomMealInsert(newMealID INT, userID INT, addedDate DATE)
	BEGIN
		IF ((SELECT COUNT(*) FROM ProgressInfo WHERE date = addedDate AND uID = userID) = 0) THEN
			BEGIN
            INSERT INTO ProgressInfo VALUES (userID, addedDate, 0, 0.00, 0.00, 0.00);
            UPDATE ProgressInfo p, (SELECT SUM(i.calories * quantity) as calories, SUM(i.protein * quantity) as protein, SUM(i.carbohydrate * quantity) as carb, SUM(i.totalFat * quantity) as fat FROM FoodIngredients i, FoodCustomMeals c WHERE c.mealID = newMealID AND c.foodID = i.foodID) as t
            SET p.calories=t.calories, p.protein = t.protein, p.carbohydrate = t.carb, p.totalFat = t.fat
            WHERE p.uID = userID AND p.date = addedDate;
			END;
        ELSE
            UPDATE ProgressInfo p, (SELECT SUM(i.calories * quantity) as calories, SUM(i.protein * quantity) as protein, SUM(i.carbohydrate * quantity) as carb, SUM(i.totalFat * quantity) as fat FROM FoodIngredients i, FoodCustomMeals c WHERE c.mealID = newMealID AND c.foodID = i.foodID) as t
            SET p.calories=p.calories + t.calories, p.protein = p.protein + t.protein,
            p.carbohydrate = p.carbohydrate + t.carb, p.totalFat = p.totalFat + t.fat
            WHERE p.uID = userID AND p.date = addedDate;
        END IF;
	END//
DELIMITER ;    

-- Procedure to update rows in ProgressInfo when meal is removed from eaten
DELIMITER //
CREATE PROCEDURE beforeEatenCustomMealDelete(newMealID INT, userID INT, addedDate DATE, mealQuantity INT)
	BEGIN
		UPDATE ProgressInfo p, (SELECT SUM(i.calories * quantity) as calories, SUM(i.protein * quantity) as protein, SUM(i.carbohydrate * quantity) as carb, SUM(i.totalFat * quantity) as fat FROM FoodIngredients i, FoodCustomMeals c WHERE c.mealID = newMealID AND c.foodID = i.foodID) as t
		SET p.calories=p.calories - (t.calories * mealQuantity), p.protein = p.protein - (t.protein * mealQuantity),
		p.carbohydrate = p.carbohydrate - (t.carb * mealQuantity), p.totalFat = p.totalFat - (t.fat * mealQuantity)
		WHERE p.uID = userID AND p.date = addedDate;
	END//
DELIMITER ;

-- Get calories and macros consumed by a user on a specific day
DELIMITER //
CREATE PROCEDURE currentCalories(IN userID INT, IN date DATE)
	BEGIN
		SELECT p.calories FROM ProgressInfo p WHERE p.date = date AND p.uID = userID;
	END//
CREATE PROCEDURE currentProtein(IN userID INT, IN date DATE)
	BEGIN
		SELECT p.protein FROM ProgressInfo p WHERE p.date = date AND p.uID = userID;
	END//
CREATE PROCEDURE currentCarbohydrate(IN userID INT, IN date DATE)
	BEGIN
		SELECT p.carbohydrate FROM ProgressInfo p WHERE p.date = date AND p.uID = userID;
	END//
CREATE PROCEDURE currentTotalFat(IN userID INT, IN date DATE)
	BEGIN
		SELECT p.totalFat FROM ProgressInfo p WHERE p.date = date AND p.uID = userID;
	END//
DELIMITER ;

-- Get user's daily calorie goal
DELIMITER //
CREATE PROCEDURE dailyCalorieGoal(IN userID INT, OUT calorieGoal INT)
	BEGIN
		SELECT u.caloricGoal FROM Users u WHERE u.uID = userID;
	END//
DELIMITER ;

-- Declare procedures for weekly, monthly, yearly calorie counts
DELIMITER //
CREATE PROCEDURE weeklyCalorieCount(userID INT, givenDay DATE)
	BEGIN
		SELECT WEEKDAY(date), calories FROM ProgressInfo WHERE uID = userID AND date BETWEEN givenDay-6 AND givenDay;
	END//

CREATE PROCEDURE monthlyCalorieCount(userID INT, givenDay DATE)
	BEGIN
		SELECT DAY(date), calories FROM ProgressInfo WHERE uID = userID AND date BETWEEN givenDay-29 AND givenDay;
	END//

CREATE PROCEDURE yearlyCalorieCount(userID INT, year INT)
	BEGIN
		SELECT MONTH(date), AVG(calories) FROM ProgressInfo WHERE uID = userID AND YEAR(date) = year GROUP BY MONTH(date);
	END//
DELIMITER ;


create user 'cs348admin'@'localhost' identified by 'admin';
grant all on foodData.* to 'cs348admin'@'localhost';	
alter user 'cs348admin'@'localhost' identified with mysql_native_password by 'admin';
