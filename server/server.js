const express = require("express");
const cors = require("cors");
const app = express();
const fs = require('fs');

app.use(cors());
app.use(express.json());


app.get("/initialize", (req, res) => {

    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "cs348admin",
        password: "admin",
        database:"foodData"
    });

    con.connect(function(err) {
        var message = "";

        if (err)  res.json({ message: err });

        let data = parseJson();
        
        con.query("DELETE FROM users");
        for (let i = 0; i < data.length; i++){
            con.query("INSERT INTO users (uid, name) VALUES ("+data[i].FIELD1+", '"+data[i].name+"')", function(err, result){});
        }

        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            
            res.json({message: "INSERTED ALL FOODS, RESULTS (and check database):\n" +JSON.stringify(result)});
          });         
    });
});


function parseJson(){
    let data = fs.readFileSync('database/sample-data.json');
    let dataParsed = JSON.parse(data);
    return dataParsed;
}

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});