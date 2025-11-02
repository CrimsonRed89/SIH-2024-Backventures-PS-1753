import './dataTable.scss'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { 
    truckColumns, 
    tripColumns, 
    facilityColumns, 
} from '../../dataTableSource';
import { AppContext } from '../../App';

const DataTable = ({ resource, title }) => {

    const { truckData, facilityData, tripData } = useContext(AppContext)

    const [data, setData] = useState([]);
    const [fields, setFields] = useState(truckColumns)

    useEffect(() => {
        switch(resource) {
            case "trucks":
                setFields(truckColumns);
                break;
            case "facilities":
                setFields(facilityColumns);
                break;
            case "trips":
                setFields(tripColumns);
                break;
            default:
                break;
        }

        if (resource === "trucks") {
            return setData(truckData);
        } else if (resource === "facilities") {
            return setData(facilityData)
        } else if (resource === "trips") {
            const tripsData = tripData.map(trip => {return {
                ...trip, 
                startDate: new Date(trip.startDate).toLocaleString(),
                endDate: new Date(trip.endDate).toLocaleString()
            }})

            return setData(tripsData);
        }
    }, [resource])

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/${resource}/${params.row.id}`} style={{textDecoration: "none", flex: 2}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='dataTable'>
            <div className="datatableTitle">
                {title}
                <Link to={`/${resource}/new`} style={{textDecoration: "none"}} className="link">
                    Add New
                </Link> 
            </div>
            <DataGrid
                rows={data}
                columns={fields.concat(actionColumn)}
                autoHeight={true}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                className='datagrid'
                getRowHeight={() => 'auto'}
            />
        </div>
    )
}

export default DataTable