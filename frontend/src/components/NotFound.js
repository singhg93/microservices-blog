import React from 'react';
import {
    Link
} from 'react-router-dom';

function NotFound(props) {
    return (
        <div className="container text-center pt-5">
            <h1 className="display3 font-weight-bold">
                404 - Page not found
            </h1>

            <Link to='/' >Go Home</Link>
        </div>
    )
}

export default NotFound;
