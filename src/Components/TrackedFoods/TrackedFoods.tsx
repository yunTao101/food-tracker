import React, { useState, useContext, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Grid from "@mui/material/Grid";
import * as FoodService from "../../Services/FoodService";
import * as ProgressService from "../../Services/ProgressService";
import Context from "../../store/context";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Pagination,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import backGroundImage from "../../Resources/white.jpeg";

const TrackedFoods = () => {
  const originalRows = [
    {
      mealID: 0,
      foodID: 1,
      uID: 1,
      name: "Cornstarch",
      servingSize: 100,
      calories: 381,
      protein: 0.26,
      carbohydrate: 91.27,
      sugars: 0.0,
      totalFat: 0.1,
      quantity: 1,
      date: "",
    },
  ];
  const navigate = useNavigate();
  const { actions } = useContext<any>(Context);
  const { userInfoState, date } = useContext<any>(Context);
  const [search, setSearch] = useState<String>("");
  const [foods, setFoods] = useState(originalRows);
  const tabsIndex = useRef(0);
  const [filteredFoods, setfilteredFoods] = useState(originalRows);
  const [cartList, setCartList] = useState<Array<any>>([{}]);
  const [tempArray, setTempArray] = useState([]);
  const [tempArray2, setTempArray2] = useState([]);
  const [tempArray3, setTempArray3] = useState([]);
  const currentTab = useRef(0);
  const [pagination, setPagination] = useState(0);
  const pageIndex = useRef(1);
  const updatedMealsList = useRef(true);

  useEffect(() => {
    if (currentTab.current === 0 && updatedMealsList.current === false) {
      updatedMealsList.current = true;
      setTempArray([]);
      filteredFoods.forEach((item) => {
        if (item.foodID) {
          FoodService.getIngredientsByFoodID(item.foodID).then(({ data }) => {
            item.name = data[0].name;
            item.calories =
              Math.round(data[0].calories * item.quantity * 100) / 100;
            item.carbohydrate =
              Math.round(data[0].carbohydrate * item.quantity * 100) / 100;
            item.protein =
              Math.round(data[0].protein * item.quantity * 100) / 100;
            item.totalFat =
              Math.round(data[0].totalFat * item.quantity * 100) / 100;
            setTempArray(tempArray.concat(data[0]));
          });
        }
      });
    }

    // else
    if (currentTab.current === 1 && updatedMealsList.current === false) {
      updatedMealsList.current = true;
      setTempArray2([]);
      filteredFoods.forEach((item) => {
        console.log(item);
        if (item.mealID) {
          FoodService.getTotalValuesFromMeal(item.mealID).then(({ data }) => {
            item.name = data[0]["mealName"];
            item.calories =
              Math.round(data[0]["TotalCalories"] * item.quantity * 100) / 100;
            item.carbohydrate =
              Math.round(data[0]["TotalCarbohydrate"] * item.quantity * 100) /
              100;
            item.protein =
              Math.round(data[0]["TotalProtein"] * item.quantity * 100) / 100;
            item.totalFat =
              Math.round(data[0]["TotalFat"] * item.quantity * 100) / 100;
            console.log(data[0]);
            setTempArray2(tempArray2.concat(data[0]));
          });
        }
      });
    }
  }, [filteredFoods]);

  useEffect(() => {
    if (userInfoState.uID) {
      handleGetFoodData();
    }
  }, [userInfoState]);

  useEffect(() => {
    if (tempArray3.length > 0) {
      setfilteredFoods(tempArray3);
      setTempArray3([]);
    }
  }, [tempArray3]);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const index = value - 1;
    pageIndex.current = value;
    handleGetFoodData();
  };

  const handleClick = (event: any) => {
    const id: String = event.currentTarget.id;
    updatedMealsList.current = false;
    if (id == "trackedIngredients") {
      tabsIndex.current = 0;
      pageIndex.current = 1;
      currentTab.current = 0;
      handleGetFoodData();
    } else if (id == "trackedMeals") {
      tabsIndex.current = 1;
      pageIndex.current = 1;
      currentTab.current = 1;
      handleGetFoodData();
    }
  };

  const handleGetFoodData = () => {
    let name = "";
    let uID = null;
    switch (tabsIndex.current) {
      case 0:
        name = "EatenIngredients";
        uID = userInfoState.uID;
        break;
      case 1:
        name = "EatenCustomMeals";
        uID = userInfoState.uID;
        break;
    }
    FoodService.getRowsSearch(
      name,
      search.toLowerCase(),
      uID,
      formatDateToSql(date)
    ).then(({ data }) => {
      let newList = data.slice(
        (pageIndex.current - 1) * 25,
        (pageIndex.current - 1) * 25 + 25
      );
      setfilteredFoods(newList);
      setPagination(Math.ceil(data.length / 25));
      updatedMealsList.current = false;
    });
  };

  function formatDateToSql(date: Date) {
    console.log(date);
    const jsDate = new Date(date);

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleDelete = (id: any, uID: any, date: any) => {
    if (currentTab.current === 0) {
      FoodService.delSpecificIngFromEaten(id, uID, formatDateToSql(date)).then(
        ({ data }) => {
          ProgressService.removeFromProgressWithIngredient(
            id,
            userInfoState.uID,
            formatDateToSql(date),
            1
          ).then(() => {
            handleGetFoodData();
          });
        }
      );
    } else if (currentTab.current === 1) {
      FoodService.delSpecificMealFromEaten(id, uID, formatDateToSql(date)).then(
        ({ data }) => {
          ProgressService.removeFromProgressWithCustomMeal(
            id,
            userInfoState.uID,
            formatDateToSql(date),
            1
          ).then(() => {
            handleGetFoodData();
          });
        }
      );
    }
  };

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
              width: "150vh",
              position: "relative",
            }}
          >
            <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
              <Stack
                spacing={2}
                sx={{ width: 1100, marginTop: 5, marginBottom: 5 }}
              >
                <IconButton
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    color: "white",
                  }}
                  onClick={() => {
                    navigate("/homePage");
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>

                <Tabs
                  value={tabsIndex.current}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab
                    id="trackedIngredients"
                    onClick={handleClick}
                    label="Tracked Ingredients"
                  ></Tab>
                  <Tab
                    id="trackedMeals"
                    onClick={handleClick}
                    label="Tracked Meals"
                  ></Tab>
                </Tabs>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <Pagination
                        count={pagination}
                        page={pageIndex.current}
                        variant="outlined"
                        onChange={changePage}
                      />
                      <TableRow>
                        <TableCell>Food (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Untrack</TableCell>
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
                          <TableCell align="right">
                            {row.carbohydrate}
                          </TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">
                            <Button
                              disabled={row.uID != userInfoState.uID}
                              onClick={() =>
                                handleDelete(
                                  row.foodID ? row.foodID : row.mealID,
                                  row.uID,
                                  row.date
                                )
                              }
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </ThemeProvider>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default TrackedFoods;
