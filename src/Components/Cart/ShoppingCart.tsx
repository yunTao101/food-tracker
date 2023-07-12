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
import * as FoodService from "../../Services/FoodService";


const ShoppingCart = () => {

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
    }

    return (
        <div>
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
        </TableContainer>
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
      </div>
    )
}

export default ShoppingCart;