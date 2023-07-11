import React, { useState, useContext } from "react";
import * as AccountService from "../../Services/AccountService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import backGroundImage from "../../Resources/white.jpeg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Context from "../../store/context";
import PersonIcon from "@mui/icons-material/Person";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FoodDiary from "./FoodDiary";

const Home = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<String>();
  const [lastName, setLastName] = useState<String>();
  const [username, setUsername] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [age, setAge] = useState<number | null>();
  const [gender, setGender] = useState<String>();
  const [weight, setWeight] = useState<number | null>();
  const [height, setHeight] = useState<number | null>();
  const [desiredWeight, setDesiredWeight] = useState<number | null>();
  const [caloricGoal, setCaloricGoal] = useState<number | null>();
  const { actions } = useContext<any>(Context);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.id === "firstName") {
      setFirstName(event.target.value);
    } else if (event.target.id === "lastName") {
      setLastName(event.target.value);
    } else if (event.target.id === "username") {
      setUsername(event.target.value);
    } else if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    } else if (event.target.id === "age") {
      setAge(parseInt(event.target.value, 10));
    } else if (event.target.id === "gender") {
      setGender(event.target.value);
    } else if (event.target.id === "weight") {
      setWeight(parseInt(event.target.value, 10));
    } else if (event.target.id === "height") {
      setHeight(parseInt(event.target.value, 10));
    } else if (event.target.id === "desiredWeight") {
      setDesiredWeight(parseInt(event.target.value, 10));
    } else if (event.target.id === "caloricGoal") {
      setCaloricGoal(parseInt(event.target.value, 10));
    }
  };

  const registerUser = () => {
    AccountService.registerAccount(
      "User",
      firstName,
      lastName,
      username,
      email,
      password,
      age,
      gender,
      weight,
      height,
      desiredWeight,
      caloricGoal
    ).then(() => {
      AccountService.loginAccount(username, password).then(({ data }) => {
        if (data.length !== 0) {
          actions({
            type: "setUserInfo",
            payload: data[0],
          });
          navigate("/homePage");
        } else {
          console.log("ERRORR");
        }
      });
    });
  };

  return (
    <>
      <Box
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `url(${backGroundImage})`,
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            filter: "drop-shadow(0 0 0.75rem black)",
          }}
        >
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundSize: "cover",
                height: "90vh",
                backgroundColor: "#EC7C75",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vh",
                position: "relative",
              }}
            >
              <IconButton
                style={{
                  position: "absolute",
                  top: "1%",
                  left: "1%",
                  color: "white",
                }}
                onClick={() => {
                  navigate("/accountInfo");
                }}
              >
                <Avatar sx={{ bgcolor: "#ffffff", mr: "10px" }}>
                  <PersonIcon sx={{ color: "black" }} />
                </Avatar>
              </IconButton>
              <ThemeProvider
                theme={createTheme({ palette: { mode: "light" } })}
              >
                <Container>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h4"
                      sx={{
                        // position: "absolute",
                        top: "3%",
                        mb: "0.5em",
                        // left: "50%",
                        fontSize: 60,
                        //transform: "translate(-50%, -1%)",
                        color: "white",
                      }}
                    >
                      EAT. TRACK. REPEAT.
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker />
                    </LocalizationProvider>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em", mt: "1em" }}>
                      <Box
                        sx={{
                          filter: "drop-shadow(0 0 0.2rem black)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px",
                          backgroundColor: "white",
                          borderRadius: "4px",
                          maxWidth: "500px",
                          margin: "0 auto",
                        }}
                      >
                        <Typography variant="h6" component="span" color="black">
                          Calories Consumed: 239
                        </Typography>
                        <Typography variant="h6" component="span" color="black">
                          Calories Left: 1900
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px",
                          borderRadius: "4px",
                          maxWidth: "500px",
                          margin: "0 auto",
                        }}
                      >
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
                          onClick={() => {
                            navigate("/searchFoods");
                          }}
                        >
                          Track
                        </Button>
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
                          onClick={() => {}}
                        >
                          View Tracked
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="span"
                          color="black"
                          sx={{
                            textAlign: "center",
                            flexBasis: "50%",
                            marginBottom: "10px",
                          }}
                        >
                          Food Diary
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          filter: "drop-shadow(0 0 0.3rem black)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #ccc",
                          borderRadius: "40px",
                          height: "30vh",
                          maxWidth: "600px",
                          margin: "0 auto",
                          backgroundColor: "white",
                        }}
                      >
                        <FoodDiary />
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </ThemeProvider>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
