import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './login.scss'

const Login = () => {

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({type: "LOGIN", payload: user})
            navigate("/")
        })
        .catch((error) => {
            setError(true)
        });
    }

    return (
        <div className='login'>
            <div className="top">
                <div className="left"><img src={'signingraphic.jpg'} alt=""/></div>
                <div className="right">
                    <div className="heading">
                        <h2>Logistics Manager</h2>
                        <span>Sign in with an email and password to begin!</span>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder='email' onChange={e=>setEmail(e.target.value)} />
                        <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                        { error && <span>Wrong email or password.</span> }
                    </form>
                </div>
            </div>
            <hr />
            <div className="bottom">
                <h2>Why use Logistics Manager?</h2>
                <div className="features">
                    <div className="feature">
                        <img src={'tracktruck.jpg'} alt=""/>
                        <span>Schedule vehicle movements on current and upcoming trips</span>
                    </div>
                    <div className="feature">
                        <img src={'earnings.jpg'} alt=""/>
                        <span>Track revenue generated and compare against historical earnings</span>
                    </div>
                    <div className="feature">
                        <img src={'brainstorm.jpg'} alt=""/>
                        <span>Analyze metrics and develop strategies to improve performance</span>
                    </div>
                    <div className="feature">
                        <img src={'report.jpg'} alt=""/>
                        <span>Quickly produce downloadable reports using truck and trip data</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login