import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as FoodService from "../../Services/FoodService";
import Context from "../../store/context";
import { useNavigate } from "react-router-dom";

const AddIngredient = () => {
  //(uID, name, servingSize, calories, protein, carbohydrate, sugars, totalFat)
  const navigate = useNavigate();
  const { userInfoState } = useContext<any>(Context);
  const [uID, setUID] = useState<Number>();
  const [name, setName] = useState<String>("");
  const [servingSize, setServingSize] = useState<Number>();
  const [calories, setCalories] = useState<Number>();
  const [protein, setProtein] = useState<Number>();
  const [carbohydrate, setCarbohydrate] = useState<Number>();
  const [sugars, setSugars] = useState<Number>();
  const [totalFat, setTotalFat] = useState<Number>();

  const handleSubmit = () => {
    FoodService.addIngred(
      parseInt(userInfoState.uID),
      name,
      servingSize,
      calories,
      protein,
      carbohydrate,
      sugars,
      totalFat
    );
    navigate("/searchFoods");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Serving Size (g)"
        value={servingSize}
        onChange={(event) => setServingSize(parseInt(event.target.value))}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Calories"
        value={calories}
        onChange={(event) => setCalories(parseInt(event.target.value))}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Protein (g)"
        value={protein}
        onChange={(event) => setProtein(parseInt(event.target.value))}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Carbohydrates (g)"
        value={carbohydrate}
        onChange={(event) => setCarbohydrate(parseInt(event.target.value))}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Sugars (g)"
        value={sugars}
        onChange={(event) => setSugars(parseInt(event.target.value))}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Total Fat"
        value={totalFat}
        onChange={(event) => setTotalFat(parseInt(event.target.value))}
        fullWidth
        margin="normal"
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddIngredient;
