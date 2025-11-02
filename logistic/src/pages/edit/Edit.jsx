import './edit.scss'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverTimestamp, setDoc, doc } from "firebase/firestore"; 
import { db } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { AppContext } from '../../App';

const Edit = ({ resource, title, inputs }) => {

    const [data, setData] = useState({});
    const { id } = useParams();
    const { truckData, facilityData } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (resource === "trucks") {
            const idResults = truckData.filter(truck => truck.id === id);
            if (idResults.length > 0) {
                const truck = idResults[0]
                setData(truck);
            }
        } else if (resource === "facilities") {
            const idResults = facilityData.filter(facility => facility.id === id);
            if (idResults.length > 0) {
                const facility = idResults[0]
                setData(facility);
            }
        }


        
    }, [])

    const handleInput = (e) => {
        const idValue = e.target.id;
        const value = e.target.value;

        setData({ ...data, [idValue]: value })
    }

    const goBack = () => {
        navigate(`/${resource}`);
    }

    const handleUpdates = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, resource, id), {
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate(`/${resource}`)
        } catch (error) {
            console.log(error)
        }
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
                        <form>
                            {
                                data &&
                                inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input 
                                            id={input.id}
                                            type={input.type} 
                                            placeholder={input.placeholder} 
                                            onChange={handleInput} 
                                            value={data[input.id]}
                                        />
                                    </div>
                                ))
                            }
                            <div className="btn-row">
                                <button onClick={goBack} className="cancelBtn">Cancel</button>
                                <button onClick={handleUpdates} className='submitBtn'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit