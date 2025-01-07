/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound'>
        <div className='content'>
            <h1>401 not found</h1>
            <p>Your Visited Page Not Found.You may go to Home Page</p>
            <Link to={"/Frontend"} class>Back to home page</Link>
        </div>
    </div>
  )
}

export default NotFound