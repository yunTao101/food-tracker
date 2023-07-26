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
        var weekly_xAxis_data : string[] = []
        var monthly_xAxis_data : string[] = []
        var yearly_xAxis_data : string[] = []
        var dates = [] 
        if (value === "week") {
            const numberOfDaysToSubstract = 6;
            const prior = new Date(new Date().setDate(currentDate.getDate() - numberOfDaysToSubstract));
            for (let i = 0; i < numberOfDaysToSubstract + 1; i++) {
                const day = new Date().setDate(prior.getDate() + i);
                weekly_xAxis_data.push(new Date(day).toDateString().slice(0, 3));
                dates.push(new Date(day).toDateString());
              }
            setxAxis(weekly_xAxis_data);
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
                //console.log(tempYValues);
                for (let i = 0; i < 7; i++) {
                    const dateToReorder = dayList.indexOf(weekly_xAxis_data[i]);
                    //console.log(dateToReorder);
                    yValues[i] = tempYValues[dateToReorder];
                }
                setyAxis(yValues);
            });
        }
        else if (value === "month") {
            const monthList = []
            const numberOfDaysToSubstract = 29;
            const prior = new Date(new Date().setDate(currentDate.getDate() - numberOfDaysToSubstract));
            console.log(new Date(new Date().setDate(currentDate.getDate())));
            for (let i = 0; i < numberOfDaysToSubstract + 1; ++i) {
                const day = new Date().setDate(prior.getDate() + i);
                monthly_xAxis_data.push(new Date(day).toDateString().slice(8,10));
                monthList.push()
                dates.push(new Date(day).toDateString());
              }
            setxAxis(monthly_xAxis_data);
            // setDatesToQuery(dates);
            setTabsIndex(1);
            ProgressService.getMonthlyCalorie(userInfoState.uID, convertDate(currentDate)).then(({data}) => {
                var yValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                for (let k = 0; k < data[0].length; ++k) {
                    console.log(monthly_xAxis_data);
                    const index = data[0][k]["DAY(date)"];
                    const calories = data[0][k]["calories"];
                    const indexToReorder = monthly_xAxis_data.indexOf(`${index}`);
                    yValues[indexToReorder] = calories;
                }
                console.log(yValues)
                setyAxis(yValues);
            });
        } 
        else if (value === "year") {
            yearly_xAxis_data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            setxAxis(yearly_xAxis_data);
            // setDatesToQuery([currentDate.getFullYear()])
            //setyAxis(Array.from({length: 12}, () => Math.floor(Math.random() * 40)));
            setTabsIndex(2);
            ProgressService.getYearlyCalorie(userInfoState.uID, currentDate.getFullYear()).then(({data}) => {
                var yValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                console.log(data);
                for (let k = 0; k < data[0].length; ++k) {
                    const index = data[0][k]["MONTH(date)"] - 1;
                    const calories = data[0][k]["AVG(calories)"];
                    yValues[index] = calories;
                }
                console.log(yValues)
                setyAxis(yValues);
            });
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

    if (tabsIndex === 0) {
        return (
            <div>
            <Tabs value = {tabsIndex} sx={{ borderBottom: 1, borderColor: 'divider' }}> 
                <Tab id="week" onClick={() => changeData("week")} label="Week"></Tab>  
                <Tab id="month" onClick={() => changeData("month")} label="Month"></Tab>  
                <Tab id="year" onClick={() => changeData("year")} label="Year"></Tab>
            </Tabs>
            <BarChart
                title="Last 7 Days"
                xAxis={[{ scaleType: 'band', data: xAxis, label: "Day of the Week" }]}
                yAxis={[{label: "Calories Consumed" }]}
                series={[{ data: yAxis }]}
                width={1000}
                height={300}
            />
        </div>
        )
    } else if (tabsIndex === 1) {
        return (
            <div>
            <Tabs value = {tabsIndex} sx={{ borderBottom: 1, borderColor: 'divider' }}> 
                <Tab id="week" onClick={() => changeData("week")} label="Week"></Tab>  
                <Tab id="month" onClick={() => changeData("month")} label="Month"></Tab>  
                <Tab id="year" onClick={() => changeData("year")} label="Year"></Tab>
            </Tabs>
            <BarChart
                title="Last 30 Days"
                xAxis={[{ scaleType: 'band', data: xAxis, label: "Day" }]}
                yAxis={[{label: "Calories Consumed" }]}
                series={[{ data: yAxis }]}
                width={1000}
                height={300}
            />
        </div>
        )
    } else {
        return (
            <div>
            <Tabs value = {tabsIndex} sx={{ borderBottom: 1, borderColor: 'divider' }}> 
                <Tab id="week" onClick={() => changeData("week")} label="Week"></Tab>  
                <Tab id="month" onClick={() => changeData("month")} label="Month"></Tab>  
                <Tab id="year" onClick={() => changeData("year")} label="Year"></Tab>
            </Tabs>
            <BarChart
                title= "Current Year"
                xAxis={[{ scaleType: 'band', data: xAxis, label: "Month" }]}
                yAxis={[{label: "Average Calories Consumed" }]}
                series={[{ data: yAxis }]}
                width={1000}
                height={300}
            />
        </div>
        )
    }
}

export default Progress;