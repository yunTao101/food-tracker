import React, { useState, useContext } from "react";
import TextField from '@mui/material/TextField';
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
import { Box, Container, IconButton, Pagination, Stack, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";


const ShoppingCart = () => {
    const navigate = useNavigate();
    const { cartState } = useContext<any>(Context);
    const { userInfoState } = useContext<any>(Context);
    const [name, setName] = useState<String>("");
    const cart = JSON.parse(sessionStorage.getItem('cart') || "NOOO");

    const handleSubmit = () => {
        FoodService.getSizeOfMeals().then(({ data }) => {
            const temp = JSON.parse(JSON.stringify(data));
            const count = parseInt(temp[0]["count(*)"]) + 1;
            console.log(count);
            cart.forEach((element: { foodID: any; }) => {
                if (element.foodID != null && userInfoState.uID != null){
                    console.log(element.foodID, userInfoState.uID);
                    FoodService.addMeal(count, element.foodID, name, userInfoState.uID);
                }
            });
        });
        navigate("/searchFoods");
    }

    return (
        <Box style={{
            backgroundColor: "#ffffff",
            backgroundImage: `url(${backGroundImage})`,
            height: "100vh",
            color: "#f5f5f5",
          }}> 
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
                    <Stack spacing={2} sx={{ width: 700 ,marginTop: 5, marginBottom: 5}}>
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
                            {cart.map((row: any) => (
                            <TableRow key={row.foodID}>
                                <TableCell component="th" scope="row">
                                {row.name}
                                </TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Create Meal
                    </Button>
                    </TableContainer>
                    </Stack>
            </ThemeProvider></Box></Box></Container></Box>
    )
}

export default ShoppingCart;