import React, { useState, useContext, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import * as FoodService from "../../Services/FoodService";
import Context from "../../store/context";
import { useNavigate } from "react-router-dom";

const SearchFoods = () => {
  const originalRows = [
    { foodID: 1, uID: 1, name: "Cornstarch", servingSize: 100, calories: 381, protein: 0.26, carbohydrate: 91.27, sugars: 0.00, totalFat: 0.10}
  ];
  const navigate = useNavigate();
  const { state } = useContext<any>(Context);
  const [search, setSearch] = useState<String>("");
  const [foods, setFoods] = useState(originalRows);
  const [filteredFoods, setfilteredFoods] = useState(originalRows);

  const handleClick = (event: any ) => {
    const id: String = event.currentTarget.id;
    if (id == "meals") {
      getMeals();
    } else {
      getIngredients();
    }
  };

  const getIngredients = () => {
    FoodService.getIngredients(state.value.uID).then(({ data }) => {
      if (data.length !== 0) {
        setFoods(data);
        setfilteredFoods(data.slice(0, 20));
      } else {
        console.log("Foods not loaded")
      }
    });
  };


  const getMeals = () => {
    FoodService.getMeals().then(({ data }) => {
      if (data.length !== 0) {
        setFoods(data);
        setfilteredFoods(data);
      } else {
        console.log("Foods not loaded")
      }
    });
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  }

  const handleSearchClick = () => {
    const filteredRows = foods.filter((row) => {
      return row.name.toLowerCase().includes(search.toLowerCase());
    }).slice(0, 20);
    setfilteredFoods(filteredRows);
  }

  const handleAddIngredient = () => {
    navigate("/addIngredient");
  }

  const handleDelete = (foodID: any, uID: any) => {
    console.log(foodID, uID);
    FoodService.delIngred(uID, foodID).then(() => {
      console.log(filteredFoods);
      const filteredRows = filteredFoods.filter((row) => {
        return row.foodID.valueOf() != foodID;
      })
      setfilteredFoods(filteredRows);
      FoodService.getIngredients(state.value.uID).then(({ data }) => {
        if (data.length !== 0) {
          setFoods(data);
        } else {
          console.log("Foods not loaded")
        }
      });
    });
  }
  
  return (
    <Stack spacing={2} sx={{ width: 900 }}>
      <TextField
        value={search}
        onChange={handleSearchChange}
        fullWidth
        id="search"
        label="What did you eat today?"
        name="password"
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <Button
        id="ingredients"
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{
          ":hover": {
            bgcolor: "white",
            color: "black",
          },
          mt: "10px",
          mr: "20px",
          borderRadius: 28,
          color: "#ffffff",
          minWidth: "170px",
          backgroundColor: "#ECB275",
        }}
        onClick={handleClick}
      >Ingredients</Button>
      <Button
        id="meals"
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{
          ":hover": {
            bgcolor: "white",
            color: "black",
          },
          mt: "10px",
          mr: "20px",
          borderRadius: 28,
          color: "#ffffff",
          minWidth: "170px",
          backgroundColor: "#ECB275",
        }}
        onClick={handleClick}
      >Meals</Button>
      <Button
        id="add-ingredient"
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{
          ":hover": {
            bgcolor: "white",
            color: "black",
          },
          mt: "10px",
          mr: "20px",
          borderRadius: 28,
          color: "#ffffff",
          minWidth: "170px",
          backgroundColor: "#ECB275",
        }}
        onClick={handleAddIngredient}
      >Add Ingredients</Button>
      <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Food (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Add to Cart</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFoods.map((row) => (
                <TableRow key={row.foodID}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.totalFat}</TableCell>
                  <TableCell align="right">{row.carbohydrate}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right"><Button><AddIcon/></Button></TableCell>
                  <TableCell align="right"><Button disabled={row.uID != state.value.uID} onClick={() => handleDelete(row.foodID, state.value.uID)}><DeleteIcon/></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Stack>
  );
}
export default SearchFoods;