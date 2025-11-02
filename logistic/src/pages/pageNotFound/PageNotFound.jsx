import React from 'react'
import { Link } from 'react-router-dom'
import './pageNotFound.scss'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
        <div className="heading">
            <h2>404: Page Not Found</h2>
        </div>
        <div className="imageContainer">
            <img src="notFound.jpg" alt="" />
        </div>
        <div className="message">
            <span>Sorry, it looks like the page you were looking for could not be found.</span>
            <button><Link to="/" style={{textDecoration: "none", color: "white"}}>Return Home</Link></button>
        </div>

    </div>
  )
}

export default PageNotFound