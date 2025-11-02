import React, { useContext, useEffect, useState } from 'react'
import './featured.scss'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AppContext } from '../../App';

const Featured = () => {
    const { tripData } = useContext(AppContext)
    const [targetRevenue] = useState(100000);
    const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
    const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
    const [thisYearRevenue, setThisYearRevenue] = useState(0);
    const [lastYearRevenue, setLastYearRevenue] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        /*
            Featured has four metrics to track:

            - Current revenue for the month — the revenue earned from trips that started between midnight on the first of current month and now
            - Target revenue — the current month's revenue (midnight on the first to now) compared to the month's goal
            - vs. Last Month — the current month's revenue (midnight on the first to now) compared to the previous month's revenue (midnight on the first to 11:59 of the last ("<" first of current month))
            - vs. YTD — the current year's revenue (midnight on 1/1 to today) compared to last year's revenue (1/1 to 12/31)
        */

        const today = new Date();
        let firstOfThisMonth = new Date(new Date().setDate(1))
        firstOfThisMonth = new Date(firstOfThisMonth.setHours(0, 0, 0, 0))
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        let firstOfLastMonth = new Date(new Date(lastMonth).setDate(1))
        firstOfLastMonth = new Date(firstOfLastMonth.setHours(0, 0, 0, 0))
        const firstOfThisYear = new Date("January 1, 2022 00:00:00");
        const firstOfLastYear = new Date("January 1, 2021 00:00:00"); 

        // filter trips by period (before today and after first second of the time period)
        const thisMonthTrips = tripData.filter((trip) => (((new Date(trip.startDate)).getTime() <= today.getTime()) && ((new Date(trip.startDate)).getTime() >= firstOfThisMonth.getTime())));
        const lastMonthTrips = tripData.filter((trip) => (((new Date(trip.startDate)).getTime() < firstOfThisMonth.getTime()) && ((new Date(trip.startDate)).getTime() >= firstOfLastMonth.getTime())));
        const thisYearTrips = tripData.filter((trip) => (((new Date(trip.startDate)).getTime() <= today.getTime()) && ((new Date(trip.startDate)).getTime() >= firstOfThisYear.getTime())));
        const lastYearTrips = tripData.filter((trip) => (((new Date(trip.startDate)).getTime() < firstOfThisYear.getTime()) && ((new Date(trip.startDate)).getTime() >= firstOfLastYear.getTime())));

        const thisMonthEarnings = thisMonthTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);
        const lastMonthEarnings = lastMonthTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);
        const thisYearEarnings = thisYearTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);
        const lastYearEarnings = lastYearTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);

        setThisMonthRevenue(thisMonthEarnings);
        setLastMonthRevenue(lastMonthEarnings);
        setThisYearRevenue(thisYearEarnings);
        setLastYearRevenue(lastYearEarnings);
        setPercent(((thisMonthEarnings / targetRevenue) * 100).toFixed(1));

    }, [])

    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertOutlinedIcon fontSize='small'/>
            </div>
            <div className="middle">
                <div className="featuredChart">
                    <div className="chartDiv">
                        <CircularProgressbar 
                            value={percent} 
                            text={`${percent}%`} 
                            strokeWidth={5} 
                        />
                    </div>
                    <div className="info">
                        <p className="title">Total revenue this month:</p>
                        <p className="amount">${thisMonthRevenue}</p>
                        <p className="desc">Previous transactions processing. Last payments may not be included.</p>
                    </div>
                </div>
            </div>
            <div className="bottom">
            <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        {
                            thisMonthRevenue > targetRevenue ? (
                                <div className="itemResult positive">
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${thisMonthRevenue - targetRevenue}</div>
                                </div>
                            ) : (
                                <div className="itemResult negative">
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${targetRevenue - thisMonthRevenue}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        {
                            thisMonthRevenue > lastMonthRevenue ? (
                                <div className="itemResult positive">
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${thisMonthRevenue - lastMonthRevenue}</div>
                                </div>
                            ) : (
                                <div className="itemResult negative">
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${lastMonthRevenue - thisMonthRevenue}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className="item">
                        <div className="itemTitle">YTD</div>
                        {
                            thisYearRevenue > lastYearRevenue ? (
                                <div className="itemResult positive">
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${thisYearRevenue - lastYearRevenue}</div>
                                </div>
                            ) : (
                                <div className="itemResult negative">
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${lastYearRevenue - thisYearRevenue}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured