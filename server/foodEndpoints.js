var mysql = require("mysql");
const fs = require("fs");

var con = mysql.createConnection({
  host: "localhost",
  user: "cs348admin",
  password: "admin",
  database: "foodData",
});

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL database connected...");
  countFoodIngredients();
});

function routes(app) {
  // get all ingredients
  app.post("/getIngredients", (req, res) => {
    const vals = req.body;
    let sql = `select * from FoodIngredients Where uID = 1`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // get all ingredients
  app.post("/getIngredientsByFoodID", (req, res) => {
    const vals = req.body;
    let sql = `select * from FoodIngredients Where foodID = ${vals.foodID}`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // get all UID specific ingrediants
  app.post("/getAllIngredientsTotalCount", (req, res) => {
    const vals = req.body;
    let sql = `select count(*) from FoodIngredients Where uID = 1`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/getMyIngredientsTotalCount", (req, res) => {
    const vals = req.body;
    let sql = `select count(*) from FoodIngredients Where uID = ${vals.uID}`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/getMyMealsTotalCount", (req, res) => {
    const vals = req.body;
    let sql = `select count(*) from FoodCustomMeals Group By mealID, name`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // get ingrediants with limit
  app.post("/getIngredientsWithLimit", (req, res) => {
    const vals = req.body;
    let sql = `select * from FoodIngredients Where uID = 1 Limit ${vals.startIndex},${vals.range}`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // get my ingrediants with limit
  app.post("/getMyIngredientsWithLimit", (req, res) => {
    const vals = req.body;
    let sql = `select * from FoodIngredients Where uID = ${vals.uID} Limit ${vals.startIndex},${vals.range}`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // get meals with limit
  app.post("/getMealsWithLimit", (req, res) => {
    const vals = req.body;
    let sql = `select mealID, name, uID from FoodCustomMeals Where uID = ${vals.uID} Group By mealID, name Limit ${vals.startIndex},${vals.range}`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // get all UID specific ingrediants
  app.post("/getMyIngredients", (req, res) => {
    const vals = req.body;
    let sql = `select * from FoodIngredients Where uID = ${vals.uID}`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // get all meals
  app.post("/getMeals", (req, res) => {
    const vals = req.body;
    let sql = `select mealID, name, uID from FoodCustomMeals Where uID = ${vals.uID} Group By mealID, name, uID ;`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/getMealByMealID", (req, res) => {
    const vals = req.body;
    let sql = `select * from FoodCustomMeals Where mealID = ${vals.mealID};`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/getRowsSearch", (req, res) => {
    const vals = req.body;
    let selectClause = "*";
    let whereClause = "";
    let nameClause = "";
    let groupByClause = "";

    if (vals.uID != null || vals.prefix != "") whereClause = "Where ";
    whereClause += vals.uID != null ? "uID = " + vals.uID : "";

    if (vals.prefix != "")
      nameClause +=
        (vals.uID != null ? " AND " : "") + `name LIKE '${vals.prefix}%'`;

    if (vals.tableName == "FoodCustomMeals") {
      groupByClause = " Group By mealID, name, uID";
      selectClause = " mealID, name, uID";
    }

    if (vals.tableName == "EatenIngredients") {
      selectClause = " COUNT(foodID) as quantity, foodID, uID, date";
      nameClause += (vals.uID != null ? " AND " : "") + `date = '${vals.date}'`;
      groupByClause = "GROUP BY foodID";
    }

    if (vals.tableName == "EatenCustomMeals") {
      selectClause = " COUNT(mealID) as quantity, mealID, uID, date";
      nameClause += (vals.uID != null ? " AND " : "") + `date = '${vals.date}'`;
      groupByClause = "GROUP BY mealID";
    }

    let sql = `select ${selectClause} from ${vals.tableName} ${whereClause} ${nameClause} ${groupByClause}`;

    console.log(sql);

    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/getTotalMealValues", (req, res) => {
    const vals = req.body;
    let sql = `SELECT SUM(calories*FoodQuantity) as TotalCalories, SUM(protein*FoodQuantity) as TotalProtein, SUM(carbohydrate*FoodQuantity) as TotalCarbohydrate, SUM(totalFat*FoodQuantity) as TotalFat, mealName
    FROM FoodIngredients AS T1
    JOIN (SELECT foodID, quantity as FoodQuantity, name as mealName FROM FoodCustomMeals WHERE mealID = ${vals.mealID}) AS T2
    ON T1.foodID = T2.foodID GROUP BY mealName`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/addIngred", (req, res) => {
    const vals = req.body;
    let sql = `INSERT INTO FoodIngredients (uID, name, servingSize, calories, protein, carbohydrate, sugars, totalFat) VALUES (${vals.uID}, "${vals.name}", ${vals.servingSize}, ${vals.calories}, ${vals.protein}, ${vals.carbohydrate}, ${vals.sugars}, ${vals.totalFat})`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/delIngred", (req, res) => {
    const vals = req.body;
    console.log("HERHEHREHER", vals);
    let sql = `DELETE FROM FoodIngredients WHERE uID = ${vals.uID} AND foodID = ${vals.foodID};`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/getSizeOfMeals", (req, res) => {
    let sql = `select count(DISTINCT mealID) from FoodCustomMeals;`;
    con.query(sql, (err, results) => {
      if (err) {
        console.log("ERROR: ", results);
        throw err;
      }
      const temp = JSON.parse(JSON.stringify(results));
      const count = parseInt(temp[0]["count(*)"]);
      console.log(count);
      res.send(results);
    });
  });

  app.post("/addMeal", (req, res) => {
    const vals = req.body;
    let sql = `INSERT INTO FoodCustomMeals VALUES (${vals.mealID}, ${vals.foodID}, "${vals.name}", ${vals.quantity}, ${vals.uID})`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/delMeal", (req, res) => {
    const vals = req.body;
    let sql = `DELETE FROM FoodCustomMeals WHERE uID = ${vals.uID} AND mealID = ${vals.id};`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("delete results: ", results);
      res.send(results);
    });
  });

  app.post("/delMealFromEaten", (req, res) => {
    const vals = req.body;
    let sql = `DELETE FROM EatenCustomMeals WHERE uID = ${vals.uID} AND mealID = ${vals.id};`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("delete results: ", results);
      res.send(results);
    });
  });

  // Add tracked ingredient
  app.post("/addTrackedIngredient", (req, res) => {
    const vals = req.body;
    let sql = `INSERT INTO EatenIngredients (foodID, uID, date) VALUES (${vals.foodID}, ${vals.uID}, '${vals.date}')`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // Add tracked meal
  app.post("/addTrackedMeals", (req, res) => {
    const vals = req.body;
    let sql = `INSERT INTO EatenCustomMeals (mealID, uID, date) VALUES (${vals.mealID}, ${vals.uID}, '${vals.date}')`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  // Untrack Ingredient
  app.post("/delSpecificIngFromEaten", (req, res) => {
    const vals = req.body;
    let sql = `DELETE FROM EatenIngredients WHERE uID = ${vals.uID} AND foodID = ${vals.id} AND date = '${vals.date}' LIMIT 1;`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("delete results: ", results);
      res.send(results);
    });
  });

  // Untrack Meal
  app.post("/delSpecificMealFromEaten", (req, res) => {
    const vals = req.body;
    let sql = `DELETE FROM EatenCustomMeals WHERE uID = ${vals.uID} AND mealID = ${vals.id} AND date = '${vals.date}' LIMIT 1;`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("akshensssss", sql);
      console.log("delete results: ", results);
      res.send(results);
    });
  });

  app.post("/getNumOfMeal", (req, res) => {
    const vals = req.body;
    let nameClause = "";
    let whereClause = "";

    if (vals.uID != null || vals.prefix != "") whereClause = "Where ";
    whereClause += vals.uID != null ? "uID = " + vals.uID : "";
    whereClause += ` AND mealID = ${vals.id}`;

    let selectClause = `COUNT(mealID) as quantity`;
    nameClause += (vals.uID != null ? " AND " : "") + `date = '${vals.date}'`;
    let groupByClause = "GROUP BY mealID";

    let sql = `select ${selectClause} from EatenCustomMeals ${whereClause} ${nameClause} ${groupByClause}`;

    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("akshensssss", sql);
      console.log("delete results: ", results);
      res.send(results);
    });
  });

  app.post("/getNumOfIngredient", (req, res) => {
    const vals = req.body;
    let nameClause = "";
    let whereClause = "";

    if (vals.uID != null || vals.prefix != "") whereClause = "Where ";
    whereClause += vals.uID != null ? "uID = " + vals.uID : "";
    whereClause += ` AND foodID = ${vals.id}`;

    let selectClause = " COUNT(foodID) as quantity, foodID, uID, date";
    nameClause += (vals.uID != null ? " AND " : "") + `date = '${vals.date}'`;
    let groupByClause = "GROUP BY foodID";

    let sql = `select ${selectClause} from EatenIngredients ${whereClause} ${nameClause} ${groupByClause}`;

    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("akshensssss", sql);
      console.log("delete results: ", results);
      res.send(results);
    });
  });
}

function parseJson() {
  let data = fs.readFileSync("database/sample-data.json");
  let dataParsed = JSON.parse(data);
  return dataParsed;
}

//insert into FoodIngredients table
function insertFoodIngredients(vals) {
  let sql = `INSERT INTO FoodIngredients (uID, name, servingSize, calories, protein, carbohydrate, sugars, totalFat) VALUES (${vals.uID}, "${vals.name}", ${vals.servingSize}, ${vals.calories}, ${vals.protein}, ${vals.carbohydrate}, ${vals.sugars}, ${vals.totalFat})`;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
  });
}

//fill FoodIngredients table with production dataset
function fillFoodIngredients() {
  let data = parseJson();
  for (let i = 0; i < data.length; i++) {
    let food = data[i];
    let vals = {
      uID: 1,
      name: food.name.replace(/\,/g, "").replace(/\"/g, ""),
      servingSize: food.serving_size.replace("g", ""),
      calories: food.calories,
      protein: food.protein.replace("g", ""),
      carbohydrate: food.carbohydrate.replace("g", ""),
      sugars: food.sugars.replace("g", ""),
      totalFat: food.total_fat.replace("g", ""),
    };
    insertFoodIngredients(vals);
  }
}

function countFoodIngredients() {
  let sql = `select count(*) from FoodIngredients;`;
  let count = 0;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results[0]);
    let temp = JSON.parse(JSON.stringify(results));
    count = parseInt(temp[0]["count(*)"]);
    console.log(count);
    if (count == 0) {
      fillFoodIngredients();
    }
  });
}

module.exports = routes;
