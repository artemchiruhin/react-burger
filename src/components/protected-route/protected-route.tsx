import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

interface ProtectedRouteElementProps {
    element: any,
}
export const ProtectedRouteElement = ({ element }: ProtectedRouteElementProps) => {
    // @ts-ignore
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        void init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return auth.user ? element : <Navigate to="/login" replace />;
}