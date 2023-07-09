import React from 'react';
import { Navigate } from 'react-router-dom';

function ProctectedRoute({ element: Component, ...props }) {
    return props.loggedIn ? <Component {...props} /> : <Navigate to='/signin' />;
}

export default ProctectedRoute;