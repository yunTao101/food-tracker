import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Context from "../../store/context";
import backGroundImage from "../../Resources/white.jpeg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import * as FoodService from "../../Services/FoodService";
import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const ShoppingCart = () => {
  const originalRows = [
    {
      mealID: 1,
      foodID: 1,
      uID: 1,
      quantity: 1,
    },
  ];
  const navigate = useNavigate();
  const { actions, cartState, userInfoState, date } = useContext<any>(Context);
  const [name, setName] = useState<String>("");
  const [cartItems, setCartItems] = useState(originalRows);

  useEffect(() => {
    if (cartState) {
      setCartItems(cartState);
    }
  }, [cartState]);

  const handleTrackAndAddMeal = () => {
    FoodService.getSizeOfMeals().then(({ data }) => {
      const temp = JSON.parse(JSON.stringify(data));
      const count = parseInt(temp[0]["count(DISTINCT mealID)"]) + 1;
      console.log("meals: ", count);
      cartItems.forEach((element: { foodID: any; quantity: number }) => {
        if (element.foodID != null && userInfoState.uID != null) {
          console.log(element.foodID, userInfoState.uID);
          console.log("qunitit", element.quantity);
          FoodService.addMeal(
            count,
            element.foodID,
            name,
            userInfoState.uID,
            element.quantity
          );
        }
      });
      FoodService.addTrackedMeal(
        count,
        userInfoState.uID,
        formatDateToSql(date)
      );
    });
    actions({
      type: "setCart",
      payload: [],
    });
    navigate("/searchFoods");
  };

  const handleTrackMeals = () => {
    cartItems.forEach((element) => {
      for (let i = 0; i < element.quantity; i++) {
        console.log("gay: ", element);
        if (element.mealID != null && userInfoState.uID != null) {
          console.log("reacheddddd");
          FoodService.addTrackedMeal(
            element.mealID,
            userInfoState.uID,
            formatDateToSql(date)
          );
        }
      }
    });
    actions({
      type: "setCart",
      payload: [],
    });
    navigate("/searchFoods");
  };

  const handleTrackFoodsIndividually = () => {
    cartItems.forEach((element) => {
      for (let i = 0; i < element.quantity; i++) {
        console.log(element);
        if (element.foodID != null && userInfoState.uID != null) {
          console.log(element.foodID, userInfoState.uID);
          FoodService.addTrackedIngredient(
            element.foodID,
            userInfoState.uID,
            formatDateToSql(date)
          );
        }
      }
    });
    actions({
      type: "setCart",
      payload: [],
    });
    navigate("/searchFoods");
  };

  function formatDateToSql(date: Date) {
    console.log(date);
    const jsDate = new Date(date);

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <Box
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `url(${backGroundImage})`,
        height: "100vh",
        color: "#f5f5f5",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            filter: "drop-shadow(0 0 0.75rem black)",
          }}
        >
          <Box
            style={{
              backgroundSize: "cover",
              height: "97vh",
              backgroundColor: "#EC7C75",
              borderRadius: "40px",
              display: "flex",
              justifyContent: "center",
              width: "100vh",
              position: "relative",
            }}
          >
            <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
              <Stack
                spacing={2}
                sx={{ width: 700, marginTop: 5, marginBottom: 5 }}
              >
                <IconButton
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    color: "white",
                  }}
                  onClick={() => {
                    navigate("/searchFoods");
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Cart</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((row: any) => (
                        <TableRow key={row.foodID}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {cartItems[0].foodID ? (
                    <>
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                      />
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={handleTrackAndAddMeal}
                        >
                          Create / Track Meal
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={handleTrackFoodsIndividually}
                        >
                          Track Individually
                        </Button>
                      </ButtonGroup>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleTrackMeals}
                    >
                      Track Meals
                    </Button>
                  )}
                </TableContainer>
              </Stack>
            </ThemeProvider>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ShoppingCart;
