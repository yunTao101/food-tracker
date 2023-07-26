import React, { useState, useContext, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { Tab, Tabs } from "@mui/material";
import Context from "../../store/context";
import * as ProgressService from "../../Services/ProgressService";

const Progress = () => {
    const currentDate = new Date();
    const { userInfoState } = useContext<any>(Context);
    const [xAxis, setxAxis] = useState<Array<any>>(["helllo"]);
    const [yAxis, setyAxis] = useState<Array<any>>([3]);
    const [datesToQuery, setDatesToQuery] = useState<Array<any>>();
    const [tabsIndex, setTabsIndex] = useState(0);
    let dayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    useEffect(() => { 
        changeData("week");
    }, []);

    const changeData = (value: string) => {
        var xAxis_data : string[] = []
        var dates = [] 
        if (value === "week") {
            const numberOfDaysToSubstract = 6;
            const prior = new Date(new Date().setDate(currentDate.getDate() - numberOfDaysToSubstract));
            for (let i = 0; i < numberOfDaysToSubstract + 1; i++) {
                const day = new Date().setDate(prior.getDate() + i);
                xAxis_data.push(new Date(day).toDateString().slice(0, 3));
                dates.push(new Date(day).toDateString());
              }
            setxAxis(xAxis_data);
            // setDatesToQuery(dates);
            setTabsIndex(0);
            ProgressService.getWeeklyCalorie(userInfoState.uID, convertDate(currentDate)).then(({data}) => {
                var tempYValues = [0, 0, 0, 0, 0, 0, 0];
                var yValues = [0, 0, 0, 0, 0, 0, 0]
                for (let i = 0; i < data[0].length; i++) {
                    const index = data[0][i]["WEEKDAY(date)"];
                    const calories = data[0][i]["calories"];
                    tempYValues[index] = calories;
                }
                console.log(tempYValues);
                for (let i = 0; i < 7; i++) {
                    const dateToReorder = dayList.indexOf(xAxis_data[i]);
                    console.log(dateToReorder);
                    yValues[i] = tempYValues[dateToReorder];
                }
                setyAxis(yValues);

            });
        }
        else if (value == "month") {
            const numberOfDaysToSubstract = 29;
            const prior = new Date(new Date().setDate(currentDate.getDate() - numberOfDaysToSubstract));
            for (let i = 0; i < numberOfDaysToSubstract + 1; i++) {
                const day = new Date().setDate(prior.getDate() + i);
                xAxis_data.push(new Date(day).toDateString().slice(8,10));
                dates.push(new Date(day).toDateString());
              }
            setxAxis(xAxis_data);
            // setDatesToQuery(dates);
            setyAxis(Array.from({length: 30}, () => Math.floor(Math.random() * 40)));
            setTabsIndex(1);
        } 
        else if (value == "year") {
            xAxis_data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            setxAxis(xAxis_data);
            // setDatesToQuery([currentDate.getFullYear()])
            setyAxis(Array.from({length: 12}, () => Math.floor(Math.random() * 40)));
            setTabsIndex(2);
        }
    }

    const convertDate = (date: Date) => {
        var newDate = "";
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        newDate += year + "-" + month + "-" + day;
        return newDate;
    }

    return (
        <div>
            <Tabs value = {tabsIndex} sx={{ borderBottom: 1, borderColor: 'divider' }}> 
                <Tab id="week" onClick={() => changeData("week")} label="Week"></Tab>  
                <Tab id="month" onClick={() => changeData("month")} label="Month"></Tab>  
                <Tab id="year" onClick={() => changeData("year")} label="Year"></Tab>
            </Tabs>
            <BarChart
                xAxis={[{ scaleType: 'band', data: xAxis }]}
                series={[{ data: yAxis }]}
                width={1000}
                height={300}
            />
        </div>
    )
}

export default Progress;