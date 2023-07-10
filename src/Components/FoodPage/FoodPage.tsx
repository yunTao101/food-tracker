import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
// import SearchBar from "material-ui-search-bar";
import * as FoodService from "../../Services/FoodService";
import { useNavigate } from "react-router-dom";
import Context from "../../store/context";

const FoodPage = () => {
  const originalRows = [
    { foodID: 1, uID: 1, name: "Cornstarch", servingSize: 100, calories: 381, protein: 0.26, carbohydrate: 91.27, sugars: 0.00, totalFat: 0.10}
  ];
  const tableNames = ["FoodIngredients", "FoodCustomMeals"]
  const [search, setSearch] = useState<String>("");
  const [sqlTable, setSqlTable] = useState<String>();
  const [foods, setFoods] = useState(originalRows);
  const [filteredFoods, setfilteredFoods] = useState(originalRows);

  const handleClick = (event: any ) => {
    const id: String = event.currentTarget.id;
    if (id == "meals") {
      setSqlTable(tableNames[1]);
      getMeals();
    } else {
      setSqlTable(tableNames[0]);
      getIngredients();
    }
  };

  const getIngredients = () => {
    FoodService.getIngredients().then(({ data }) => {
      if (data.length !== 0) {
        setFoods(data);
        setfilteredFoods(data.slice(0, 20));
      } else {
        console.log("Foods not loaded")
      }
    });
  };

  const getMeals = () => {
    FoodService.getMeals().then(({ data }) => {
      if (data.length !== 0) {
        setFoods(data);
        setfilteredFoods(data);
      } else {
        console.log("Foods not loaded")
      }
    });
  };

  const requestSearch = (searchedVal: any) => {
    console.log(searchedVal);
    const filteredRows = foods.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setfilteredFoods(filteredRows);
  };

  const cancelSearch = () => {
    getIngredients();
  }

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  }

  const handleSearchClick = () => {
    const filteredRows = foods.filter((row) => {
      return row.name.toLowerCase().includes(search.toLowerCase());
    }).slice(0, 20);
    setfilteredFoods(filteredRows);
  }
  
  return (
    <Stack spacing={2} sx={{ width: 900 }}>
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
      <Button
        id="ingredients"
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
        onClick={handleClick}
      >Ingredients</Button>
      <Button
        id="meals"
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
        onClick={handleClick}
      >Meals</Button>
      <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Food (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Add to Cart</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFoods.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.totalFat}</TableCell>
                  <TableCell align="right">{row.carbohydrate}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">
                    <AddIcon/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Stack>
  );
}
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     {
//       title: 'The Lord of the Rings: The Return of the King',
//       year: 2003,
//     },
//     { title: 'The Good, the Bad and the Ugly', year: 1966 },
//     { title: 'Fight Club', year: 1999 },
//     {
//       title: 'The Lord of the Rings: The Fellowship of the Ring',
//       year: 2001,
//     },
//     {
//       title: 'Star Wars: Episode V - The Empire Strikes Back',
//       year: 1980,
//     },
//     { title: 'Forrest Gump', year: 1994 },
//     { title: 'Inception', year: 2010 },
//     {
//       title: 'The Lord of the Rings: The Two Towers',
//       year: 2002,
//     },
//     { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//     { title: 'Goodfellas', year: 1990 },
//     { title: 'The Matrix', year: 1999 },
//     { title: 'Seven Samurai', year: 1954 },
//     {
//       title: 'Star Wars: Episode IV - A New Hope',
//       year: 1977,
//     },
//     { title: 'City of God', year: 2002 },
//     { title: 'Se7en', year: 1995 },
//     { title: 'The Silence of the Lambs', year: 1991 },
//     { title: "It's a Wonderful Life", year: 1946 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
//     { title: 'Casablanca', year: 1942 },
//     { title: 'City Lights', year: 1931 },
//     { title: 'Psycho', year: 1960 },
//     { title: 'The Green Mile', year: 1999 },
//     { title: 'The Intouchables', year: 2011 },
//     { title: 'Modern Times', year: 1936 },
//     { title: 'Raiders of the Lost Ark', year: 1981 },
//     { title: 'Rear Window', year: 1954 },
//     { title: 'The Pianist', year: 2002 },
//     { title: 'The Departed', year: 2006 },
//     { title: 'Terminator 2: Judgment Day', year: 1991 },
//     { title: 'Back to the Future', year: 1985 },
//     { title: 'Whiplash', year: 2014 },
//     { title: 'Gladiator', year: 2000 },
//     { title: 'Memento', year: 2000 },
//     { title: 'The Prestige', year: 2006 },
//     { title: 'The Lion King', year: 1994 },
//     { title: 'Apocalypse Now', year: 1979 },
//     { title: 'Alien', year: 1979 },
//     { title: 'Sunset Boulevard', year: 1950 },
//     {
//       title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//       year: 1964,
//     },
//     { title: 'The Great Dictator', year: 1940 },
//     { title: 'Cinema Paradiso', year: 1988 },
//     { title: 'The Lives of Others', year: 2006 },
//     { title: 'Grave of the Fireflies', year: 1988 },
//     { title: 'Paths of Glory', year: 1957 },
//     { title: 'Django Unchained', year: 2012 },
//     { title: 'The Shining', year: 1980 },
//     { title: 'WALL·E', year: 2008 },
//     { title: 'American Beauty', year: 1999 },
//     { title: 'The Dark Knight Rises', year: 2012 },
//     { title: 'Princess Mononoke', year: 1997 },
//     { title: 'Aliens', year: 1986 },
//     { title: 'Oldboy', year: 2003 },
//     { title: 'Once Upon a Time in America', year: 1984 },
//     { title: 'Witness for the Prosecution', year: 1957 },
//     { title: 'Das Boot', year: 1981 },
//     { title: 'Citizen Kane', year: 1941 },
//     { title: 'North by Northwest', year: 1959 },
//     { title: 'Vertigo', year: 1958 },
//     {
//       title: 'Star Wars: Episode VI - Return of the Jedi',
//       year: 1983,
//     },
//     { title: 'Reservoir Dogs', year: 1992 },
//     { title: 'Braveheart', year: 1995 },
//     { title: 'M', year: 1931 },
//     { title: 'Requiem for a Dream', year: 2000 },
//     { title: 'Amélie', year: 2001 },
//     { title: 'A Clockwork Orange', year: 1971 },
//     { title: 'Like Stars on Earth', year: 2007 },
//     { title: 'Taxi Driver', year: 1976 },
//     { title: 'Lawrence of Arabia', year: 1962 },
//     { title: 'Double Indemnity', year: 1944 },
//     {
//       title: 'Eternal Sunshine of the Spotless Mind',
//       year: 2004,
//     },
//     { title: 'Amadeus', year: 1984 },
//     { title: 'To Kill a Mockingbird', year: 1962 },
//     { title: 'Toy Story 3', year: 2010 },
//     { title: 'Logan', year: 2017 },
//     { title: 'Full Metal Jacket', year: 1987 },
//     { title: 'Dangal', year: 2016 },
//     { title: 'The Sting', year: 1973 },
//     { title: '2001: A Space Odyssey', year: 1968 },
//     { title: "Singin' in the Rain", year: 1952 },
//     { title: 'Toy Story', year: 1995 },
//     { title: 'Bicycle Thieves', year: 1948 },
//     { title: 'The Kid', year: 1921 },
//     { title: 'Inglourious Basterds', year: 2009 },
//     { title: 'Snatch', year: 2000 },
//     { title: '3 Idiots', year: 2009 },
//     { title: 'Monty Python and the Holy Grail', year: 1975 },
//   ];

export default FoodPage;