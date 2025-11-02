import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import "./widget.scss";
import { AppContext } from '../../App';

const Widget = ({ type }) => {

    const [amount, setAmount] = useState(null);
    const [diff, setDiff] = useState(null);
    const { truckData, tripData, facilityData } = useContext(AppContext)

    let data;

    switch(type) {
        case "truck":
            data = {
                title: "TRUCKS",
                isMoney: false,
                link: "All trucks",
                url: "/trucks",
                query: "trucks",
                icon: (
                    <LocalShippingOutlinedIcon
                        className="icon" 
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, .2)"
                        }}
                    />
                )
            }
            break;
        case "trip":
            data = {
                title: "TRIPS",
                isMoney: false,
                link: "All trips",
                url: "/trips",
                query: "trips",
                icon: (
                    <MapOutlinedIcon 
                        className="icon" 
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgba(218, 165, 32, .2)"
                        }}
                    />
                )
            }
            break;
        case "facility":
            data = {
                title: "FACILITIES",
                isMoney: false,
                link: "All facilities",
                url: '/facilities',
                query: "facilities",
                icon: (
                    <FactoryOutlinedIcon
                        className="icon" 
                        style={{
                            color: "green",
                            backgroundColor: "rgba(0, 128, 0, .2)"
                        }}
                    />
                )
            }
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "All earnings",
                url: "",
                query: "trips",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon" 
                        style={{
                            color: "purple",
                            backgroundColor: "rgba(128, 0, 128, .2)"
                        }}
                    />
                )
            }
            break;
        default:
            break;
    }

    useEffect(() => {
        const today = new Date();
        const lastMonthToDate = new Date(new Date().setMonth(today.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(today.getMonth() - 2));

        if (type !== "earning") {
            if (data.query === "trucks") {
                const thisMonthTrucks = truckData.filter((truck) => ((truck.timeStamp.seconds * 1000 <= today.getTime()) && (truck.timeStamp.seconds * 1000 > lastMonthToDate.getTime())));
                const previousMonthTrucks = truckData.filter((truck) => (truck.timeStamp.seconds * 1000 <= lastMonthToDate.getTime()) && (truck.timeStamp.seconds * 1000 > previousMonth.getTime()));

                setAmount(truckData.length);

                const changeOverMonth = ((thisMonthTrucks.length - previousMonthTrucks.length) / previousMonthTrucks.length) * 100;

                setDiff(changeOverMonth.toFixed(1))

            } 
            else if (data.query === "trips") {
                const thisMonthTrips = tripData.filter((trip) => ((trip.timeStamp.seconds * 1000 <= today.getTime()) && (trip.timeStamp.seconds * 1000 > lastMonthToDate.getTime())));
                const previousMonthTrips = tripData.filter((trip) => (trip.timeStamp.seconds * 1000 <= lastMonthToDate.getTime()) && (trip.timeStamp.seconds * 1000 > previousMonth.getTime()));

                setAmount(tripData.length);

                const changeOverMonth = ((thisMonthTrips.length - previousMonthTrips.length) / previousMonthTrips.length) * 100;

                setDiff(changeOverMonth.toFixed(0))

            }
            else if (data.query === "facilities") {
                const thisMonthFacilities = facilityData.filter((facility) => ((facility.timeStamp.seconds * 1000 <= today.getTime()) && (facility.timeStamp.seconds * 1000 > lastMonthToDate.getTime())));
                const previousMonthFacilities = facilityData.filter((facility) => (facility.timeStamp.seconds * 1000 <= lastMonthToDate.getTime()) && (facility.timeStamp.seconds * 1000 > previousMonth.getTime()));

                setAmount(facilityData.length);

                const changeOverMonth = ((thisMonthFacilities.length - previousMonthFacilities.length) / previousMonthFacilities.length) * 100;

                setDiff(changeOverMonth.toFixed(0))

            }
            else {
                setAmount(0);
            }
        } else {
            const thisMonthTrips = tripData.filter((trip) => ((trip.timeStamp.seconds * 1000 <= today.getTime()) && (trip.timeStamp.seconds * 1000 > lastMonthToDate.getTime())));
            const previousMonthTrips = tripData.filter((trip) => (trip.timeStamp.seconds * 1000 <= lastMonthToDate.getTime()) && (trip.timeStamp.seconds * 1000 > previousMonth.getTime()));

            const totalEarnings =  tripData.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);
            const thisMonthEarnings = thisMonthTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);
            const previousMonthEarnings = previousMonthTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);

            setAmount(totalEarnings);

            const changeOverMonth = ((thisMonthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100;

            setDiff(changeOverMonth.toFixed(0))
        }
    }, [])

    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <Link to={data.url} style={{textDecoration: "none"}}>
                    <span className="link">{data.link}</span>
                </Link>
            </div>
            <div className="right">
                <div className={diff >= 0 ? "percentage positive": "percentage negative"}>
                    {diff >= 0 ? <KeyboardArrowUpIcon className="pct-icon"/> : <KeyboardArrowDownIcon className="pct-icon"/>}
                        {Math.abs(diff)}%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget