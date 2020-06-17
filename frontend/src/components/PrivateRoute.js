import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/authContext';


function PrivateRoute({component: Component, ...rest}) {
    const isAuthenticated = useAuth();
    
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated.loggedIn ? (
                <Component {...props} username={isAuthenticated.username} avatar={isAuthenticated.avatar} />
            ) : (
                <Redirect to="/login" />
            )
        )}/>
    )
}

export default PrivateRoute;
