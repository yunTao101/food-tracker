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
    let sql = `select mealID, name from FoodCustomMeals Group By mealID, name Limit ${vals.startIndex},${vals.range}`;
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
    let sql = `select mealID, name from FoodCustomMeals Group By mealID, name;`;
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
