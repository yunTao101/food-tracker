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
            console.log("WEEKLY CALORIES: ", results);
            res.send(results);
          });
    });
}

module.exports = routes;