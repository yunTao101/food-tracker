import React, { useState, useContext, useEffect } from "react";
import * as AccountService from "../../Services/AccountService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import backGroundImage from "../../Resources/white.jpeg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Context from "../../store/context";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

const AccountInfo = () => {
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
  const { state, actions } = useContext<any>(Context);

  useEffect(() => {
    if (state.value) {
      if (state.value.firstName) {
        setFirstName(state.value.firstName);
      }
      if (state.value.lastName) {
        setLastName(state.value.lastName);
      }
      if (state.value.username) {
        setUsername(state.value.username);
      }
      if (state.value.email) {
        setEmail(state.value.email);
      }
      if (state.value.password) {
        setPassword(state.value.password);
      }
      if (state.value.age) {
        setAge(state.value.age);
      }
      if (state.value.gender) {
        setGender(state.value.gender);
      }
      if (state.value.weight) {
        setWeight(state.value.weight);
      }
      if (state.value.height) {
        setHeight(state.value.height);
      }
      if (state.value.desiredWeight) {
        setDesiredWeight(state.value.desiredWeight);
      }
      if (state.value.caloricGoal) {
        setCaloricGoal(state.value.caloricGoal);
      }
    }
  }, [state.value]);

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

  const deleteUser = () => {
    AccountService.deleteAccount(state.value.uID);
    navigate("/");
  };

  const updateUser = () => {
    AccountService.updateAccount(
      state.value.uID,
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
    ).then(({ data }) => {
      if (data.length !== 0) {
        actions({
          type: "setState",
          payload: { value: data },
        });
      } else {
        console.log("ERRORR");
      }
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
                width: "150vh",
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
                  navigate("/homePage");
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
                      <PersonIcon sx={{ color: "black" }} />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                      Account Information
                    </Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em", mt: "1em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={firstName}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        InputLabelProps={{ shrink: firstName ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={lastName}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        InputLabelProps={{ shrink: lastName ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={username}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        InputLabelProps={{ shrink: username ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={email}
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        InputLabelProps={{ shrink: email ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={password}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        InputLabelProps={{ shrink: password ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={age}
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                        InputLabelProps={{ shrink: age ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={gender}
                        fullWidth
                        id="gender"
                        label="Gender"
                        name="gender"
                        InputLabelProps={{ shrink: gender ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={weight}
                        fullWidth
                        id="weight"
                        label="Weight"
                        name="weight"
                        InputLabelProps={{ shrink: weight ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={height}
                        fullWidth
                        id="height"
                        label="Height"
                        name="height"
                        InputLabelProps={{ shrink: height ? true : false }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={desiredWeight}
                        fullWidth
                        id="desiredWeight"
                        label="Desired Weight"
                        name="desiredWeight"
                        InputLabelProps={{
                          shrink: desiredWeight ? true : false,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        onChange={handleTextFieldChange}
                        value={caloricGoal}
                        fullWidth
                        id="caloricGoal"
                        label="Calorie Goal"
                        name="caloricGoal"
                        InputLabelProps={{
                          shrink: caloricGoal ? true : false,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      ml: "3em",
                      mr: "3em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                      onClick={updateUser}
                    >
                      Update
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
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      logout
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
                        backgroundColor: "#000000",
                      }}
                      onClick={deleteUser}
                    >
                      Delete Account
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

export default AccountInfo;