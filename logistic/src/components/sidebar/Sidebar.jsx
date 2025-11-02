import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import './sidebar.scss'

const Sidebar = () => {

    const { dispatch } = useContext(AuthContext)

    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <span className="logo">Logistics Manager</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <div className="title">RESOURCES</div>
                    <Link to="/trucks" style={{textDecoration: "none"}}>
                        <li>
                            <LocalShippingOutlinedIcon className="icon" />
                            <span>Trucks</span>
                        </li>
                    </Link>
                    <Link to="/trips" style={{textDecoration: "none"}}>
                        <li>
                            <MapOutlinedIcon className="icon" />
                            <span>Trips</span>
                        </li>
                    </Link>
                    <Link to="/facilities" style={{textDecoration: "none"}}>
                        <li>
                            <FactoryOutlinedIcon className="icon" />
                            <span>Facilities</span>
                        </li>                    
                    </Link>
                    <div className="title">TOOLS</div>
                    <li className='disabled'>
                        <CalendarMonthOutlinedIcon className="icon" />
                        <span>Calendar</span>
                    </li>
                    <li className='disabled'>
                        <CompareArrowsOutlinedIcon className="icon" />
                        <span>Compare</span>
                    </li>
                    <li className='disabled'>
                        <AssessmentOutlinedIcon className="icon" />
                        <span>Generate Report</span>
                    </li>
                    <li className='disabled'> 
                        <SettingsOutlinedIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <div className="title">ACCOUNT</div>
                    <li onClick={handleLogout}>
                        <LogoutOutlinedIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <span>All Rights Reserved, 2022</span>
            </div>
        </div>
    )
}

export default Sidebar