import './new.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, serverTimestamp, collection, Timestamp } from "firebase/firestore"; 
import { db } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const New = ({ resource, title, inputs }) => {

    const [data, setData] = useState({});
    const navigate = useNavigate();


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value })
    }

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
            navigate(`/${resource}`)
        } catch (error) {
            console.log(error)
        }
    }

    const goBack = () => {
        navigate(`/${resource}`);
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
                            {
                                inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input 
                                            id={input.id}
                                            type={input.type} 
                                            placeholder={input.placeholder} 
                                            onChange={handleInput} 
                                        />
                                    </div>
                                ))
                            }
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

export default New