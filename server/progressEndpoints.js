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
});

function routes(app) {
  app.post("/weeklyCalorie", (req, res) => {
    const vals = req.body;
    let sql = `CALL weeklyCalorieCount(${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      // console.log("WEEKLY CALORIES: ", results);
      res.send(results);
    });
  });

  app.post("/monthlyCalorie", (req, res) => {
    const vals = req.body;
    let sql = `CALL monthlyCalorieCount(${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      // console.log("MONTHLY CALORIES: ", results);
      res.send(results);
    });
  });

  app.post("/yearlyCalorie", (req, res) => {
    const vals = req.body;
    let sql = `CALL yearlyCalorieCount(${vals.uID}, ${vals.year});`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      // console.log("YEARLY CALORIES: ", results);
      res.send(results);
    });
  });

  app.post("/currentCalories", (req, res) => {
    const vals = req.body;
    let sql = `CALL currentCalories(${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Current calories: ", results);
      res.send(results);
    });
  });

  app.post("/currentProtein", (req, res) => {
    const vals = req.body;
    let sql = `CALL currentProtein(${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("currentProtein: ", results);
      res.send(results);
    });
  });

  app.post("/currentCarbohydrate", (req, res) => {
    const vals = req.body;
    let sql = `CALL currentCarbohydrate(${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("currentCarbohydrate: ", results);
      res.send(results);
    });
  });

  app.post("/currentTotalFat", (req, res) => {
    const vals = req.body;
    let sql = `CALL currentTotalFat(${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("currentTotalFat: ", results);
      res.send(results);
    });
  });

  app.post("/addToProgressWithIngredient", (req, res) => {
    const vals = req.body;
    let sql = `CALL afterEatenIngredientInsert(${vals.foodID}, ${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  app.post("/removeFromProgressWithIngredient", (req, res) => {
    const vals = req.body;
    let sql = `CALL afterEatenIngredientDelete(${vals.foodID}, ${vals.uID}, "${vals.date}", ${vals.quantity});`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  app.post("/addToProgressWithCustomMeal", (req, res) => {
    const vals = req.body;
    let sql = `CALL afterEatenCustomMealInsert(${vals.mealID}, ${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      console.log("jons", vals.date);
      res.send(results);
    });
  });

  app.post("/removeFromProgressWithCustomMeal", (req, res) => {
    const vals = req.body;
    let sql = `CALL beforeEatenCustomMealDelete(${vals.mealID}, ${vals.uID}, "${vals.date}", ${vals.quantity});`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  app.post("/recalculateProgressInfo", (req, res) => {
    const vals = req.body;
    let sql = `CALL recalculateProgressInfo(${vals.uID}, "${vals.date}");`;
    con.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
}

module.exports = routes;
