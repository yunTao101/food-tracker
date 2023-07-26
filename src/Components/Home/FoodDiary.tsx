import React, { useState, useContext, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Context from "../../store/context";
import * as ProgressService from "../../Services/ProgressService";

export default function FoodDiary(props : any) {
  const currentDate = props.selectedDate;
  const { userInfoState } = useContext<any>(Context);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [total, setTotal] = useState(0);
  const legendLabelStyle = {
    fill: "black", // Set the desired text color here
    fontSize: "24px", // Set the desired font size here
  };

  const convertDate = (date: Date) => {
    var newDate = "";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    newDate += year + "-" + month + "-" + day;
    return newDate;
  }

  useEffect(() => { 
    if (props.selectedDate) {
      ProgressService.getcurrentCarbohydrate(userInfoState.uID, convertDate(currentDate)).then(({data}) => {
        if (data[0].length == 0) {
          setCarbs(0);
        } else {
          setCarbs(data[0][0]["carbohydrate"]);
        }
      })
  
      ProgressService.getcurrentProtein(userInfoState.uID, convertDate(currentDate)).then(({data}) => {
        if (data[0].length == 0) {
          setProtein(0);
        } else {
          setProtein(data[0][0]["protein"]);
        }
      })
  
      ProgressService.getcurrentTotalFat(userInfoState.uID, convertDate(currentDate)).then(({data}) => {
        if (data[0].length == 0) {
          setFats(0);
        } else {
          setFats(data[0][0]["totalFat"]);
        }
      })
    }
    
  });

const allNull = () => {
  if (protein == 0 && carbs == 0 && fats == 0) {
    return true;
  } else {
    return false;
  }
}

  return (
    <div>
      {allNull() ? (
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 1, label: `No Entry` },
            ],
          },
        ]}
        width={400}
        height={200}
        legendLabel={({ index }: { index: number }) => (
          <text style={legendLabelStyle}>{`Series ${index}`}</text>
        )}
      />
      ) : ( 
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: carbs, label: `Carbs (g)` },
              { id: 1, value: fats, label: "Fat (g)" },
              { id: 2, value: protein, label: "Protein (g)" },
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
    </div>
  );
}
