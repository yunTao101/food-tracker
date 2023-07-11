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

const Register = () => {
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
                height: "97vh",
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
                  top: 10,
                  left: 10,
                  color: "white",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
                <Container>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#ffffff", mr: "10px" }}>
                      <LockOpenIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                      Register
                    </Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em", mt: "1em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        fullWidth
                        id="gender"
                        label="Gender"
                        name="gender"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        fullWidth
                        id="weight"
                        label="Weight"
                        name="weight"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        fullWidth
                        id="height"
                        label="Height"
                        name="height"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        fullWidth
                        id="desiredWeight"
                        label="Desired Weight"
                        name="agdesiredWeighte"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        fullWidth
                        id="caloricGoal"
                        label="Calorie Goal"
                        name="caloricGoal"
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                    <Button
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
                      onClick={registerUser}
                    >
                      Register
                    </Button>
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

export default Register;
