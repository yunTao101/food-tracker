const express = require("express");
const cors = require("cors");
const app = express();
const userAccountEndpoints = require("./userAccountEndpoints");
const foodEndpoints = require("./foodEndpoints")

app.use(cors());
app.use(express.json());

userAccountEndpoints(app);
foodEndpoints(app);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
