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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/base/Snackbar";
import Alert from "@mui/material/Alert";
import Context from "../../store/context";

const Login = () => {
  const navigate = useNavigate();
  const { actions } = useContext<any>(Context);
  const [username, setUsername] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [loginError, setLoginError] = useState<boolean | undefined>(false);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.id === "username") {
      setUsername(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  };

  const loginUser = () => {
    AccountService.loginAccount(username, password).then(({ data }) => {
      if (data.length !== 0) {
        actions({
          type: "setUserInfo",
          payload: data[0],
        });
        setLoginError(false);
        navigate("/homePage");
      } else {
        setLoginError(true);
        console.log("ERRORR");
      }
    });
  };

  const handleCloseSnackBar = (event: any, reason?: any) => {
    if (reason === "clickaway") {
      return;
    }

    setLoginError(false);
  };

  return (
    <>
      <Snackbar
        open={loginError}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Login information is not correct!
        </Alert>
      </Snackbar>
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
          }}
        >
          <Box
            sx={{
              height: "70vh",
              bgcolor: "white",
              filter: "drop-shadow(0 0 0.75rem black)",
              borderRadius: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "130vh",
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={12} lg={6}>
                <Box
                  style={{
                    backgroundSize: "cover",
                    height: "70vh",
                    minHeight: "500px",
                    backgroundColor: "#EC7C75",
                    borderRadius: " 40px 0px 0px 40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ThemeProvider
                    theme={createTheme({ palette: { mode: "dark" } })}
                  >
                    <Container>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar sx={{ bgcolor: "#ffffff", mr: "10px" }}>
                          <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                          Login
                        </Typography>
                      </Box>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          sx={{ ml: "3em", mr: "3em", mt: "2em" }}
                        >
                          <TextField
                            onChange={handleTextFieldChange}
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{ ml: "3em", mr: "3em", mb: "2em" }}
                        >
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
                            onClick={loginUser}
                          >
                            Sign In
                          </Button>
                          <Typography
                            style={{
                              marginTop: "20px",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            OR
                          </Typography>
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
                            onClick={() => {
                              navigate("/register");
                            }}
                          >
                            Register
                          </Button>
                        </Grid>
                      </Grid>
                    </Container>
                  </ThemeProvider>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    style={{
                      margin: "50px",
                      color: "#EC7C75",
                      fontSize: 100,
                    }}
                  >
                    EAT. <br /> TRACK. REPEAT.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
