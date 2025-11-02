import React, { useEffect, useState } from 'react'
import './infoCard.scss'

const InfoCard = ({resource, heading, data}) => {

    const [resData, setResData] = useState([]);

    useEffect(() => {
        if (resource === "truck") {
            setResData({
                resName: data.license,
                resourceData1: `Driver: ${data.driver_name}`,
                resourceData2: `Truck Capacity: ${data.capacity} lbs`,
                resourceImg: '/semi-truck.png'
            })
        } else if (resource === "facility") {
            setResData({
                resName: data.facilityName,
                resourceData1: data.address,
                resourceData2: `${data.city}, ${data.facilityState} ${data.zipCode}`,
                resourceImg: '/warehouse.png'
            })
        }
    }, [data, resource])

    const {resName, resourceData1, resourceData2, resourceImg} = resData;

    return (
        <div className='cardContainer'>
            <h2 className='header'>{heading}</h2>
            <div className="card-body">
                <div className="card-left">
                    <div className="information">
                        <div className="resourceTitle">{resName}</div>
                        <div className="data">
                            <div className="resourceData1">{resourceData1}</div>
                            <div className="resourceData2">{resourceData2}</div>
                        </div>
                    </div>
                </div>
                <div className="card-right">
                    <img src={resourceImg} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default InfoCard