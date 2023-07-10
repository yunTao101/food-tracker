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
 
    fillFoodIngredients();

});

function routes(app) {
  // search ingredient
  app.post("/getIngredients", (req, res) => {
    //let sql = `select * from FoodIngredients where name LIKE '${req.body.name}%';`
    //let sql = `select * from ${req.body.table};`
    let sql = `select * from FoodIngredients`
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Search results: ", results);
      res.send(results);
    });
  });

  app.post("/getMeals", (req, res) => {
    //let sql = `select * from FoodIngredients where name LIKE '${req.body.name}%';`
    //let sql = `select * from ${req.body.table};`
    let sql = `select mealID, name from FoodCustomMeals Group By mealID, name;`
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
    let food = data[i]
    let vals =  {
      uID: 1,
      name: food.name.replace(/\,/g, '').replace(/\"/g, ''),
      servingSize: food.serving_size.replace('g', ''),
      calories: food.calories,
      protein: food.protein.replace('g', ''),
      carbohydrate: food.carbohydrate.replace('g', ''),
      sugars: food.sugars.replace('g', ''),
      totalFat: food.total_fat.replace('g', '')
    }
    insertFoodIngredients(vals);
  }
}

function searchFoodIngredients(name) {
  //let sql = `select * from FoodIngredients where name LIKE '${name}%';`
  let sql = `select * from FoodIngredients';`
  con.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
}

function countFoodIngredients(){
    let sql = `select count(*) from FoodIngredients;`
    con.query(sql, (err, results) => {
        if (err) throw err;
        results = JSON.parse(JSON.stringify(results));
        console.log(results[0]['count(*)']);
        return(results);
      });
}

module.exports = routes;
