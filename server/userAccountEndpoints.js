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
  // Get food
  // app.get("/initialize", (req, res) => {
  //   let data = parseJson();

  //   con.query("DELETE FROM users");
  //   for (let i = 0; i < data.length; i++) {
  //     con.query(
  //       "INSERT INTO users (uid, name) VALUES (" +
  //         data[i].FIELD1 +
  //         ", '" +
  //         data[i].name +
  //         "')",
  //       function (err, result) {}
  //     );
  //   }

  //   con.query("SELECT * FROM users", function (err, result, fields) {
  //     if (err) throw err;

  //     res.json({
  //       message:
  //         "INSERTED ALL FOODS, RESULTS (and check database):\n" +
  //         JSON.stringify(result),
  //     });
  //   });
  // });

  // login
  app.post("/login", (req, res) => {
    console.log("Loging in...", req.body);
    let sql = `SELECT * FROM Users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Account that was found: ", results);
      res.send(results);
    });
  });

  // register
  app.post("/register", (req, res) => {
    console.log("Inserting a new account...");

    let sql = `INSERT INTO Users (accountType, firstName, lastName, username, password, email, gender, age, weight, height, desiredWeight, caloricGoal) VALUES ('${req.body.accountType}', '${req.body.firstName}','${req.body.lastName}','${req.body.username}','${req.body.password}','${req.body.email}','${req.body.gender}', ${req.body.age},${req.body.weight},${req.body.height},${req.body.desiredWeight},${req.body.caloricGoal})`;

    con.query(sql, (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.send(result);
    });
  });

  // delete account
  app.post("/delete", (req, res) => {
    console.log("Deleting in...", req.body);
    let sql = `DELETE FROM Users WHERE uID = ${req.body.uID}`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Account that was deleted: ", results);
      res.send(results);
    });
  });

  // update account
  app.post("/update", (req, res) => {
    console.log("Updating vals...", req.body);
    let sql = `UPDATE Users SET firstName = '${req.body.firstName}', lastName = '${req.body.lastName}', username = '${req.body.username}', email = '${req.body.email}', password = '${req.body.password}', age = ${req.body.age}, gender = '${req.body.gender}', weight = ${req.body.weight}, height = ${req.body.height}, desiredWeight = ${req.body.desiredWeight} , caloricGoal = ${req.body.caloricGoal} WHERE uID = ${req.body.uID}`;
    con.query(sql, (err, results) => {
      console.log("uod: ", req.body.uID);
      if (err) throw err;
      console.log("Account that was updated: ", results);
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
function insertFoodIngredients() {

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
    let sql = `INSERT INTO FoodIngredients (uID, name, servingSize, calories, protein, carbohydrate, sugars, totalFat) VALUES (${vals.uID}, "${vals.name}", ${vals.servingSize}, ${vals.calories}, ${vals.protein}, ${vals.carbohydrate}, ${vals.sugars}, ${vals.totalFat})`;
    con.query(sql, (err, results) => {
      if (err) {
        console.log(sql);
        throw err;
      }
    });
  }
}


module.exports = routes;
