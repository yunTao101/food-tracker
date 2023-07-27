import React, { useState, useContext, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Context from "../../store/context";
import * as ProgressService from "../../Services/ProgressService";
import Typography from "@mui/material/Typography";

export default function FoodDiary() {
  const { date, userInfoState } = useContext<any>(Context);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const legendLabelStyle = {
    fill: "black", // Set the desired text color here
    fontSize: "24px", // Set the desired font size here
  };

  function formatDateToSql(date: Date) {
    console.log(date);
    const jsDate = new Date(date);

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (date) {
      ProgressService.getcurrentCarbohydrate(
        userInfoState.uID,
        formatDateToSql(date)
      ).then(({ data }) => {
        if (data[0].length === 0) {
          setCarbs(0);
        } else {
          setCarbs(data[0][0]["carbohydrate"]);
        }
      });
      ProgressService.getcurrentProtein(
        userInfoState.uID,
        formatDateToSql(date)
      ).then(({ data }) => {
        if (data[0].length === 0) {
          setProtein(0);
        } else {
          setProtein(data[0][0]["protein"]);
        }
      });
      ProgressService.getcurrentTotalFat(
        userInfoState.uID,
        formatDateToSql(date)
      ).then(({ data }) => {
        if (data[0].length === 0) {
          setFats(0);
        } else {
          setFats(data[0][0]["totalFat"]);
        }
      });
    }
  }, [date, userInfoState.uID]);

  const allNull = () => {
    if (protein === 0 && carbs === 0 && fats === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {allNull() ? (
        // <PieChart
        //   series={[
        //     {
        //       data: [{ id: 0, value: 1, label: `No Food Entries` }],
        //     },
        //   ]}
        //   width={400}
        //   height={200}
        //   legendLabel={({ index }: { index: number }) => (
        //     <text style={legendLabelStyle}>{`Series ${index}`}</text>
        //   )}
        // />
        <Typography
          variant="h6"
          component="span"
          color="black"
          sx={{
            textAlign: "center",
            flexBasis: "50%",
            marginBottom: "10px",
            fontSize: "40px",
          }}
        >
          Track an Entry!
        </Typography>
      ) : (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: Math.round(carbs * 100) / 100,
                  label: "Carbs: " + Math.round(carbs * 100) / 100 + "g",
                },
                {
                  id: 1,
                  value: Math.round(fats * 100) / 100,
                  label: "Fat: " + Math.round(fats * 100) / 100 + "g",
                },
                {
                  id: 2,
                  value: Math.round(protein * 100) / 100,
                  label: "Protein: " + Math.round(protein * 100) / 100 + "g",
                },
              ],
            },
          ]}
          width={400}
          height={200}
          legendLabel={({ index }: { index: number }) => (
            <text style={legendLabelStyle}>{`Series ${index}`}</text>
          )}
        />
      )}
    </>
  );
}
