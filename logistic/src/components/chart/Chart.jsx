import './chart.scss'
import { AreaChart, BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useContext, useEffect } from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

const Chart = ({ title, tripsData }) => {
    const [isArea, setIsArea] = useState(true);
    const [ earningData, setEarningData ] = useState([]);
    
    const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber);

        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }


    useEffect(() => {
        const today = new Date();
        const thisMonthIndex = today.getMonth()

        const populateDates = () => {
            setEarningData([]);

            for (let i = 6; i > 0 ; i--) {
                    setEarningData(prev => [...prev, {
                        "name": toMonthName(thisMonthIndex + 1 - i), 
                        "Total": (
                                    tripsData.filter(trip => ( new Date(new Date(trip.startDate)).getMonth() === (thisMonthIndex + 1 - i)) && ( new Date(trip.startDate)).getTime() <= today.getTime()
                                    ).map(
                                        trip => trip.earnings
                                    ).reduce(
                                        (previousVal, currentVal) => (previousVal + currentVal), 0
                                    )
                                )
                            }
                        ]
                    )
                }
            }
            populateDates();
        }, [])


    const handleToggle = () => {
        setIsArea(!isArea);
    }


    return (
        <div className="chart">
            <div className="top">
                <h1 className='title'>{title}</h1>
                <div onClick={handleToggle}>
                    <span className="btnText">{isArea ? <AssessmentIcon /> : <CropOriginalIcon />}</span>
                </div>
            </div>
            <div className="bottom">
                <ResponsiveContainer width="100%" height="100%">
                {isArea ?
                    <AreaChart
                    width={300}
                    height={300}
                    data={earningData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" 
                        style={{
                            fontSize: '.7em'
                        }}
                    />
                    <YAxis 
                        style={{
                            fontSize: '.7em'
                        }}
                    />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#807dbd" fill="#807dbd" />
                    </AreaChart>
                :
                    <BarChart
                        width={500}
                        height={300}
                        data={earningData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Total" fill="#807dbd" />
                    </BarChart>
                }
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Chart