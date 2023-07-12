import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function FoodDiary() {
  const legendLabelStyle = {
    fill: "black", // Set the desired text color here
    fontSize: "24px", // Set the desired font size here
  };

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "Carbs (20%)" },
            { id: 1, value: 15, label: "Fat (35%)" },
            { id: 2, value: 20, label: "Protein (45%)" },
          ],
        },
      ]}
      width={400}
      height={200}
      legendLabel={({ index }: { index: number }) => (
        <text style={legendLabelStyle}>{`Series ${index}`}</text>
      )}
    />
  );
}
