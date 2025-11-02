import './newTrip.scss'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, serverTimestamp, collection, Timestamp } from "firebase/firestore";
import { db } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar' 
import Navbar from '../../components/navbar/Navbar'
import Select from '../../components/select/Select';
import { AppContext } from '../../App';

const NewTrip = ({ resource, title }) => {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    const { truckData, facilityData } = useContext(AppContext);

    const [truckChoice, setTruckChoice] = useState("")
    const [facilityOne, setFacilityOne] = useState("");
    const [facilityTwo, setFacilityTwo] = useState("");

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value })
    }

    useEffect(() => {
        setData({
            ...data, 
            truck: truckChoice, 
            originFacility: facilityOne, 
            destinationFacility: facilityTwo
        })
    }, [truckChoice, facilityOne, facilityTwo])


    const handleAdd = async (e) => {
        e.preventDefault();


        try {
            if (resource === "trips") {
                    data.earnings = parseInt(data.earnings);
                    data.startDate = Timestamp.fromDate(new Date(data.startDate));
                    data.endDate = Timestamp.fromDate(new Date(data.endDate));      
                }
            await addDoc(collection(db, resource), {
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }

    const goBack = () => {
        navigate(`/trips`);
    }


    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Truck</label>
                            <Select 
                                    className="custom-select" 
                                    defaultText={"Select a Truck"} 
                                    id="secondTruck"
                                    setter={setTruckChoice}
                                    data={truckData}
                                    label="license"
                                    resource="trucks"

                                />
                            </div>
                            <div className="formInput">
                                <label>Origin Facility</label>
                                <Select 
                                        className="custom-select" 
                                        defaultText={"Select a Facility"}
                                        setter={setFacilityOne}
                                        data={facilityData}
                                        label="facilityName"
                                        resource="facilities"

                                    />
                            </div>
                            <div className="formInput">
                                <label>Destination Facility</label>
                                <Select 
                                    className="custom-select" 
                                    defaultText={"Select a Facility"} 
                                    setter={setFacilityTwo}
                                    data={facilityData}
                                    label="facilityName"
                                    resource="facilities"

                                />
                            </div>
                            <div className="formInput">
                                <label>Start Date</label>
                                <input 
                                    id={"startDate"}
                                    type={"datetime-local"}
                                    onChange={handleInput} 
                                />
                            </div>
                            <div className="formInput">
                                <label>End Date</label>
                                <input 
                                    id={"endDate"}
                                    type={"datetime-local"}
                                    onChange={handleInput} 
                                />
                            </div>
                            <div className="formInput">
                                <label>Earnings</label>
                                <input 
                                    id={"earnings"}
                                    type={"text"} 
                                    placeholder={"1234.56"} 
                                    onChange={handleInput} 
                                />
                            </div>
                            <div className="btn-row">
                                <button onClick={goBack} className="cancelBtn">Cancel</button>
                                <button onClick={handleAdd} className='submitBtn'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTrip