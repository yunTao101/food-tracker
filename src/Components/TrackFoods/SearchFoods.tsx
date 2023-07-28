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
import RemoveIcon from "@mui/icons-material/Remove";
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

const SearchFoods = () => {
  const originalRows = [
    {
      mealID: 1,
      foodID: 1,
      uID: 1,
      name: "Cornstarch",
      servingSize: 100,
      calories: 381,
      protein: 0.26,
      carbohydrate: 91.27,
      sugars: 0.0,
      totalFat: 0.1,
    },
  ];
  const navigate = useNavigate();
  const { userInfoState, date, cartState, actions } = useContext<any>(Context);
  const [search, setSearch] = useState<String>("");
  const [foods, setFoods] = useState(originalRows);
  const [tabsIndex, setTabsIndex] = useState(0);
  const [filteredFoods, setfilteredFoods] = useState(originalRows);
  const [cartList, setCartList] = useState<Array<any>>([]);

  const currentTab = useRef(0);
  const isSearching = useRef(false);
  const [ingrediantsPageCount, setIngrediantsPageCount] = useState(0);
  const [myIngrediantsPageCount, setMyIngrediantsPageCount] = useState(0);
  const [myMealsPageCount, setMyMealsPageCount] = useState(0);
  const [tempArray, setTempArray] = useState(originalRows);
  const [pagination, setPagination] = useState(0);
  const updatedMealsList = useRef(true);
  const pageIndex = useRef(1);

  useEffect(() => {
    if (cartState) {
      setCartList(cartState);
    }
  }, [cartState]);

  useEffect(() => {
    if (userInfoState.uID) {
      getIngredients(0, 25);
      FoodService.getTotalIngrediantsCount().then(({ data }) => {
        if (data.length !== 0) {
          const count = Math.ceil(data[0]["count(*)"] / 25);
          if (data[0]["count(*)"] != 0) setIngrediantsPageCount(count);
          setPagination(count);
        }
      });

      FoodService.getTotalMyIngrediantsCount(userInfoState.uID).then(
        ({ data }) => {
          if (data.length !== 0) {
            if (data[0]["count(*)"] != 0)
              setMyIngrediantsPageCount(Math.ceil(data[0]["count(*)"] / 25));
          }
        }
      );

      FoodService.getTotalMyMealsCount(userInfoState.uID).then(({ data }) => {
        if (data.length !== 0) {
          if (data[0]["count(*)"] != 0)
            setMyMealsPageCount(Math.ceil(data[0]["count(*)"] / 25));
        }
      });
    }
  }, [userInfoState]);

  useEffect(() => {
    if (currentTab.current == 2 && updatedMealsList.current == false) {
      setTempArray([]);
      filteredFoods.forEach((item) => {
        if (item.mealID) {
          FoodService.getTotalValuesFromMeal(item.mealID).then(({ data }) => {
            item.calories = data[0]["TotalCalories"];
            item.carbohydrate = data[0]["TotalCarbohydrate"];
            item.protein = data[0]["TotalProtein"];
            item.totalFat = data[0]["TotalFat"];
            setTempArray(tempArray.concat(item));
          });
        }
      });
      updatedMealsList.current = true;
    } else {
      updatedMealsList.current = false;
    }
  }, [filteredFoods]);

  useEffect(() => {
    if (currentTab.current == 2 && tempArray.length === filteredFoods.length) {
      console.log("RANs");
      let pop = filteredFoods.pop();
      if (pop) filteredFoods.push(pop);
    }
  }, [tempArray]);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const index = value - 1;
    pageIndex.current = value;
    if (isSearching.current) {
      handleSearchClick();
    } else {
      if (currentTab.current == 0) {
        getIngredients(index, 25);
      } else if (currentTab.current == 1) {
        getMyIngrediants(index, 25);
      } else if (currentTab.current == 2) {
        getMeals(index, 25);
      }
    }
  };

  const handleClick = (event: any) => {
    const id: String = event.currentTarget.id;
    isSearching.current = false;
    if (currentTab.current === 0 || currentTab.current === 1) {
      if (id === "meals") {
        actions({
          type: "setCart",
          payload: [],
        });
      }
    } else if (currentTab.current === 2) {
      if (id === "myIngrediants" || id === "ingrediants") {
        actions({
          type: "setCart",
          payload: [],
        });
      }
    }
    if (id === "ingrediants") {
      getIngredients(0, 25);
      setPagination(ingrediantsPageCount);
      setTabsIndex(0);
      pageIndex.current = 1;
      currentTab.current = 0;
    } else if (id === "myIngrediants") {
      getMyIngrediants(0, 25);
      setPagination(myIngrediantsPageCount);
      setTabsIndex(1);
      pageIndex.current = 1;
      currentTab.current = 1;
    } else if (id === "meals") {
      getMeals(0, 25);
      setPagination(myMealsPageCount);
      setTabsIndex(2);
      pageIndex.current = 1;
      currentTab.current = 2;
    }
  };

  const getMyIngrediants = (startIndex: number, range: number) => {
    FoodService.getMyIngredients(
      userInfoState.uID,
      startIndex * 25,
      range
    ).then(({ data }) => {
      if (data.length !== 0) {
        setFoods(data);
        setfilteredFoods(data);
      } else {
        setfilteredFoods([]);
        console.log("Foods not loaded");
      }
    });
  };

  const getIngredients = (startIndex: number, range: number) => {
    FoodService.getIngrediantsWithLimit(startIndex * 25, range).then(
      ({ data }) => {
        if (data.length !== 0) {
          setFoods(data);
          console.log(data);
          setfilteredFoods(data);
        } else {
          setfilteredFoods([]);
          console.log("Foods not loaded");
        }
      }
    );
  };

  const getMeals = (startIndex: number, range: number) => {
    FoodService.getMeals(startIndex * 25, range, userInfoState.uID).then(
      ({ data }) => {
        if (data.length !== 0) {
          console.log("foods are: ", data);
          setFoods(data);
          setfilteredFoods(data);
        } else {
          setfilteredFoods([]);
          console.log("Foods not loaded");
        }
      }
    );
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  function formatDateToSql(date: Date) {
    console.log(date);
    const jsDate = new Date(date);

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleSearchClick = () => {
    let name = "";
    let uID = null;
    switch (tabsIndex) {
      case 0:
        name = "FoodIngredients";
        break;
      case 1:
        name = "FoodIngredients";
        uID = userInfoState.uID;
        break;
      case 2:
        name = "FoodCustomMeals";
        uID = userInfoState.uID;
        break;
    }
    isSearching.current = true;
    FoodService.getRowsSearch(name, search.toLowerCase(), uID).then(
      ({ data }) => {
        let result = data.slice(
          (pageIndex.current - 1) * 25,
          (pageIndex.current - 1) * 25 + 25
        );
        setfilteredFoods(result);
        setPagination(Math.ceil(data.length / 25));
      }
    );
  };

  const handleAddIngredient = () => {
    navigate("/addIngredient");
  };

  const handleAddToCart = (id: any, uID: any, name: any, isFood: boolean) => {
    if (isFood) {
      let updatedQuant = false;
      let newList = cartList;
      for (let i = newList.length - 1; i >= 0; i--) {
        if (newList[i].foodID === id && newList[i].uID === uID) {
          const tempName = newList[i].name;
          const tempQuantity = newList[i].quantity + 1;
          newList.splice(i, 1);
          updatedQuant = true;
          newList = newList.concat({
            foodID: id,
            uID,
            name: tempName,
            quantity: tempQuantity,
          });
        }
      }
      if (!updatedQuant) {
        newList = cartList.concat({ foodID: id, uID, name, quantity: 1 });
      }
      actions({
        type: "setCart",
        payload: newList,
      });
      setCartList(newList);
      console.log("cart is", newList);
    } else {
      console.log("bobisgay", cartList);
      let updatedQuant = false;
      let newList = cartList;
      for (let i = newList.length - 1; i >= 0; i--) {
        if (newList[i].mealID === id && newList[i].uID === uID) {
          const tempName = newList[i].name;
          const tempQuantity = newList[i].quantity + 1;
          newList.splice(i, 1);
          updatedQuant = true;
          newList = newList.concat({
            mealID: id,
            uID,
            name: tempName,
            quantity: tempQuantity,
          });
        }
      }
      if (!updatedQuant) {
        newList = cartList.concat({ mealID: id, uID, name, quantity: 1 });
      }
      actions({
        type: "setCart",
        payload: newList,
      });
      setCartList(newList);
      console.log("cart is", newList);
    }
  };

  const handleRemoveFromCart = (
    id: any,
    uID: any,
    name: any,
    isFood: boolean
  ) => {
    if (isFood) {
      let newList = cartList;
      for (let i = newList.length - 1; i >= 0; i--) {
        if (newList[i].foodID == id && newList[i].uID == uID) {
          if (newList[i].quantity > 0) {
            const tempName = newList[i].name;
            const tempQuantity = newList[i].quantity - 1;
            newList.splice(i, 1);
            newList = newList.concat({
              foodID: id,
              uID,
              name: tempName,
              quantity: tempQuantity,
            });
            if (tempQuantity === 0) {
              newList.splice(newList.length - 1, 1);
            }
          }
        }
      }
      setCartList(newList);
      actions({
        type: "setCart",
        payload: newList,
      });
    } else {
      let newList = cartList;
      for (let i = newList.length - 1; i >= 0; i--) {
        if (newList[i].mealID == id && newList[i].uID == uID) {
          if (newList[i].quantity > 0) {
            const tempName = newList[i].name;
            const tempQuantity = newList[i].quantity - 1;
            newList.splice(i, 1);
            newList = newList.concat({
              mealID: id,
              uID,
              name: tempName,
              quantity: tempQuantity,
            });
            if (tempQuantity === 0) {
              newList.splice(newList.length - 1, 1);
            }
          }
        }
      }
      setCartList(newList);
      actions({
        type: "setCart",
        payload: newList,
      });
    }
  };

  const quantCheck = (id: any, isFood: boolean) => {
    if (isFood) {
      let count = 0;

      cartList.forEach((item) => {
        if (item.foodID == id) {
          count = item.quantity;
        }
      });
      if (count) {
        return count.toString();
      } else {
        return "0";
      }
    } else {
      let count = 0;

      cartList.forEach((item) => {
        if (item.mealID == id) {
          count = item.quantity;
        }
      });
      if (count) {
        return count.toString();
      } else {
        return "0";
      }
    }
  };

  const handleDelete = (id: any, uID: any, name: any) => {
    if (currentTab.current == 0 || currentTab.current == 1) {
      FoodService.getNumOfIngredient(
        id,
        userInfoState.uID,
        formatDateToSql(date)
      ).then(({ data }) => {
        if (data.length > 0) {
          ProgressService.removeFromProgressWithIngredient(
            id,
            userInfoState.uID,
            formatDateToSql(date),
            data[0].quantity
          ).then(({ data }) => {
            FoodService.delIngred(uID, id).then(() => {
              console.log(filteredFoods);
              const filteredRows = filteredFoods.filter((row) => {
                return row.foodID.valueOf() != id;
              });
              setfilteredFoods(filteredRows);
              FoodService.getIngredients(userInfoState.uID).then(({ data }) => {
                if (data.length !== 0) {
                  setFoods(data);
                } else {
                  console.log("Foods not loaded");
                }
              });
            });
          });
        } else {
          FoodService.delIngred(uID, id).then(() => {
            console.log(filteredFoods);
            const filteredRows = filteredFoods.filter((row) => {
              return row.foodID.valueOf() != id;
            });
            setfilteredFoods(filteredRows);
            FoodService.getIngredients(userInfoState.uID).then(({ data }) => {
              if (data.length !== 0) {
                setFoods(data);
              } else {
                console.log("Foods not loaded");
              }
            });
          });
        }
      });
    } else {
      FoodService.getNumOfMeal(
        id,
        userInfoState.uID,
        formatDateToSql(date)
      ).then(({ data }) => {
        if (data.length > 0) {
          console.log("jack");
          ProgressService.removeFromProgressWithCustomMeal(
            id,
            userInfoState.uID,
            formatDateToSql(date),
            data[0].quantity
          ).then(({ data }) => {
            FoodService.delMeal(id, userInfoState.uID).then(() => {
              const filteredRows = filteredFoods.filter((row) => {
                return row.mealID.valueOf() != id;
              });
              setfilteredFoods(filteredRows);
            });
            FoodService.delMealFromEaten(id, userInfoState.uID).then(() => {
              const filteredRows = filteredFoods.filter((row) => {
                return row.mealID.valueOf() != id;
              });
              setfilteredFoods(filteredRows);
            });
          });
        } else {
          FoodService.delMeal(id, userInfoState.uID).then(() => {
            const filteredRows = filteredFoods.filter((row) => {
              return row.mealID.valueOf() != id;
            });
            setfilteredFoods(filteredRows);
          });
          FoodService.delMealFromEaten(id, userInfoState.uID).then(() => {
            const filteredRows = filteredFoods.filter((row) => {
              return row.mealID.valueOf() != id;
            });
            setfilteredFoods(filteredRows);
          });
        }
      });
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
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <Button
                      id="add-ingrediant"
                      variant="contained"
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
                        marginTop: 1.5,
                      }}
                      onClick={handleAddIngredient}
                    >
                      Create Ingredient
                    </Button>
                  </Grid>
                  <Grid xs={7} />
                  <Grid xs={1}>
                    <IconButton
                      onClick={() => {
                        console.log("Aaa", cartList);
                        if (cartList.length > 0) navigate("/cart");
                      }}
                      color="primary"
                      aria-label="add to shopping cart"
                    >
                      <AddShoppingCartIcon
                        sx={{ width: 50, height: 50 }}
                        htmlColor="#ECB275"
                      />
                    </IconButton>
                  </Grid>
                </Grid>

                <Tabs
                  value={tabsIndex}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab
                    id="ingrediants"
                    onClick={handleClick}
                    label="Default Ingredients"
                  ></Tab>
                  <Tab
                    id="myIngrediants"
                    onClick={handleClick}
                    label="My Ingredients"
                  ></Tab>
                  <Tab id="meals" onClick={handleClick} label="My Meals"></Tab>
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
                        <TableCell align="right">Add Item</TableCell>
                        <TableCell align="right">Remove</TableCell>
                        <TableCell align="right">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredFoods.map((row) => (
                        <TableRow key={row.foodID ? row.foodID : row.mealID}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.totalFat}</TableCell>
                          <TableCell align="right">
                            {row.carbohydrate}
                          </TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                          <TableCell align="right">
                            {quantCheck(
                              row.foodID ? row.foodID : row.mealID,
                              row.foodID ? true : false
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() =>
                                handleAddToCart(
                                  row.foodID ? row.foodID : row.mealID,
                                  row.uID,
                                  row.name,
                                  row.foodID ? true : false
                                )
                              }
                            >
                              <AddIcon />
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              onClick={() =>
                                handleRemoveFromCart(
                                  row.foodID ? row.foodID : row.mealID,
                                  row.uID,
                                  row.name,
                                  row.foodID ? true : false
                                )
                              }
                            >
                              <RemoveIcon />
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              disabled={row.uID != userInfoState.uID}
                              onClick={() =>
                                handleDelete(
                                  row.foodID ? row.foodID : row.mealID,
                                  row.uID,
                                  row.name
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
export default SearchFoods;
