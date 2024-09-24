// error.js
import React from 'react';
import { Link } from "react-router-dom";
import './Error.css'; // Import a CSS file for styling

const Error = () => {
    console.log('Error component rendered'); // Add this line
    return (
        <>
        <div className='body'>
            <div className='image'> </div>
            <div className="error-container">
                <h1>404 - Not Found</h1>
                {/* You can add other content here */}
                <Link to="/"> <button className='btn btn-danger btn-err'>Go back Now!</button></Link>
            </div>
            </div>
            </>
    );
}

export default Error;