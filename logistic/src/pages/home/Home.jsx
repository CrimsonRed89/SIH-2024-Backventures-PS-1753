import React, { useContext, useEffect, useState} from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import './home.scss'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
import { tripColumns } from '../../dataTableSource'
import { DataGrid } from '@mui/x-data-grid';
import { AppContext } from '../../App'


const Home = () => {
    const [fields] = useState(tripColumns)
    const [data, setData] = useState([]);
    const { tripData } = useContext(AppContext)

    useEffect(() => {

        const fetchData = async () => {
            const arrToSort = [...tripData]
            const sortedTrips = arrToSort.sort((a, b) =>  b.startDate - a.startDate).slice(0, 5);
            
            setData(sortedTrips.map(trip => {return {
                ...trip, 
                startDate: new Date(trip.startDate).toLocaleString(),
                endDate: new Date(trip.endDate).toLocaleString()
            }}))
        }

        fetchData();
    }, [])



    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="truck" />
                    <Widget type="trip" />
                    <Widget type="facility" />
                    <Widget type="earning" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="Total Revenue (Last 6 months)" aspect={1.75} tripsData={tripData} />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Trips</div>
                    <DataGrid
                        rows={data}
                        columns={fields}
                        autoHeight={true}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        className='datagrid'
                        getRowHeight={() => 'auto'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home