import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import backGroundImage from "../../Resources/white.jpeg";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Button from "@mui/material/Button";
import * as FoodService from "../../Services/FoodService";
import Context from "../../store/context";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

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
      100,
      calories,
      protein,
      carbohydrate,
      sugars,
      totalFat
    );
    navigate("/searchFoods");
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
              <Container maxWidth="sm" sx={{ marginTop: 15 }}>
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
                <Grid container spacing={2} justifyContent={"center"}>
                  <Avatar sx={{ bgcolor: "#ffffff", mr: "10px" }}>
                    <RestaurantIcon sx={{ color: "black" }} />
                  </Avatar>
                  <Typography component="h1" variant="h4">
                    Create Ingredient
                  </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                  {/* <TextField
                    label="Serving Size (g)"
                    value={servingSize}
                    onChange={(event) =>
                      setServingSize(parseInt(event.target.value))
                    }
                    fullWidth
                    margin="normal"
                    required
                  /> */}
                  <TextField
                    label="Calories"
                    value={calories}
                    onChange={(event) =>
                      setCalories(parseInt(event.target.value))
                    }
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Protein (g)"
                    value={protein}
                    onChange={(event) =>
                      setProtein(parseInt(event.target.value))
                    }
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Carbohydrates (g)"
                    value={carbohydrate}
                    onChange={(event) =>
                      setCarbohydrate(parseInt(event.target.value))
                    }
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Sugars (g)"
                    value={sugars}
                    onChange={(event) =>
                      setSugars(parseInt(event.target.value))
                    }
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    name="Total Fat"
                    label="Total Fat (g)"
                    value={totalFat}
                    onChange={(event) =>
                      setTotalFat(parseInt(event.target.value))
                    }
                    fullWidth
                    margin="normal"
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
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
                  >
                    Submit
                  </Button>
                </form>
              </Container>
            </ThemeProvider>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddIngredient;
