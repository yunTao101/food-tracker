import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import backGroundImage from "../../Resources/white.jpeg";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TimelineIcon from "@mui/icons-material/Timeline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Context from "../../store/context";
import PersonIcon from "@mui/icons-material/Person";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FoodDiary from "./FoodDiary";
import dayjs from "dayjs";
import * as ProgressService from "../../Services/ProgressService";

const Home = () => {
  const navigate = useNavigate();
  const [caloricGoal, setCaloricGoal] = useState<number | null>();
  const { userInfoState, actions, date } = useContext<any>(Context);
  const [dateVal, setDateVal] = useState(null);
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);

  useEffect(() => {
    setDateVal(date);
  }, [date]);

  const caloriesLeft = () => {
    if (caloricGoal == null) {
      return "No Goal Set";
    } else {
      const left = caloricGoal - caloriesConsumed;
      if (left < 0) {
        return 0;
      }
      return left;
    }
  };

  useEffect(() => {
    setCaloricGoal(userInfoState.caloricGoal);
    if (dateVal) {
      ProgressService.getcurrentCalories(
        userInfoState.uID,
        formatDateToSql(dateVal)
      ).then(({ data }) => {
        // console.log(data[0][0]["calories"]);
        if (data[0].length > 0) {
          setCaloriesConsumed(data[0][0]["calories"]);
        } else {
          setCaloriesConsumed(0);
        }
      });
    }
  }, [caloricGoal, dateVal, userInfoState.caloricGoal, userInfoState.uID]);

  function formatDateToSql(date: Date) {
    console.log(date);
    const jsDate = new Date(date);

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  console.log(date);

  const onDatePicked = (event: any) => {
    console.log(event);

    actions({
      type: "setDate",
      payload: event,
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
                <Avatar sx={{ bgcolor: "#ffffff" }}>
                  <PersonIcon sx={{ color: "black" }} />
                </Avatar>
              </IconButton>
              <IconButton
                style={{
                  position: "absolute",
                  top: "1%",
                  right: "1%",
                  color: "white",
                }}
                onClick={() => {
                  navigate("/progressView");
                }}
              >
                <Avatar sx={{ bgcolor: "#ffffff" }}>
                  <TimelineIcon sx={{ color: "black" }} />
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
                      <DatePicker
                        value={dayjs(dateVal)}
                        onChange={onDatePicked}
                      />
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
                          Calories Consumed: {caloriesConsumed}
                        </Typography>
                        <Typography variant="h6" component="span" color="black">
                          Calories Left: {caloriesLeft()}
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
                          disabled={dateVal == null}
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
                          disabled={dateVal == null}
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
                            navigate("/trackedFoods");
                          }}
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
      <FoodDiary />
    </>
  );
};

export default Home;
