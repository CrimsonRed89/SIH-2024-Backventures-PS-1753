import './editTrip.scss'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, serverTimestamp, collection, Timestamp, setDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar' 
import Navbar from '../../components/navbar/Navbar'
import Select from '../../components/select/Select';
import { AppContext } from '../../App';

const EditTrip = ({ resource, title }) => {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const { truckData, facilityData, tripData } = useContext(AppContext);

    const [truckChoice, setTruckChoice] = useState("")
    const [facilityOne, setFacilityOne] = useState("");
    const [facilityTwo, setFacilityTwo] = useState("");
    const [originDate, setOriginDate] = useState("")
    const [destinationDate, setDestinationDate] = useState("")
    const [tripEarnings, setTripEarnings] = useState("")

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value })
    }

    useEffect(() => {
        const fetchData = () => {
            
            const idResults = tripData.filter(trip => trip.id === id);
            if (idResults.length > 0) {
                const trip = idResults[0]
                setData(trip);
                setTruckChoice(trip.truck)
                setFacilityOne(trip.originFacility)
                setFacilityTwo(trip.destinationFacility)
                setOriginDate(trip.startDate)
                setDestinationDate(trip.endDate)
                setTripEarnings(trip.earnings)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        setData({
            ...data, 
            truck: truckChoice, 
            originFacility: facilityOne, 
            destinationFacility: facilityTwo,
            startDate: originDate,
            endDate: destinationDate,
            earnings: tripEarnings
        })
    }, [truckChoice, facilityOne, facilityTwo, originDate, destinationDate, tripEarnings])


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            if (resource === "trips") {
                    data.earnings = parseInt(data.earnings);
                    data.startDate = Timestamp.fromDate(new Date(data.startDate));
                    data.endDate = Timestamp.fromDate(new Date(data.endDate));      
                }
            await setDoc(doc(db, resource, id), {
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate(`/${resource}`)
        } catch (error) {
            console.log(error)
        }
    }

    const goBack = () => {
        navigate(`/trips`);
    }


    return (
        <div className='edit'>
            <Sidebar />
            <div className="editContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        {data && truckChoice && facilityOne && facilityTwo && originDate && destinationDate && 
                        <form>
                            <div className="formInput">
                                <label>Truck</label>
                            <Select
                                className="custom-select" 
                                defaultText={truckChoice} 
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
                                        defaultText={facilityOne}
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
                                    defaultText={facilityTwo} 
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
                                    defaultValue={new Date(originDate).toISOString().substr(0, 16)}
                                />
                            </div>
                            <div className="formInput">
                                <label>End Date</label>
                                <input 
                                    id={"endDate"}
                                    type={"datetime-local"}
                                    onChange={handleInput} 
                                    defaultValue={new Date(destinationDate).toISOString().substr(0, 16)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Earnings</label>
                                <input 
                                    id={"earnings"}
                                    type={"number"}
                                    onChange={(e) => setTripEarnings(e.target.value)} 
                                    value={tripEarnings}
                                    defaultValue={0}
                                />
                            </div>
                            <div className="btn-row">
                                <button onClick={goBack} className="cancelBtn">Cancel</button>
                                <button onClick={handleUpdate} className='submitBtn'>Send</button>
                            </div>
                        </form>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTrip