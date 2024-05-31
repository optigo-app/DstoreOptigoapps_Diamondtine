import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isLoginStatus }) => {
    const [isLoading, setIsLoading] = useState(true);
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeout);
    }, [isLoginStatus]);

    if (isLoading) {
        return <div></div>;
    }
    return ((storeInit?.IsB2BWebsite == 0 ) || (storeInit?.IsB2BWebsite == 1 && isLoginStatus == 'true')) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;