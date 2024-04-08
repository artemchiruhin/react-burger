import {Navigate} from 'react-router-dom';
import {useAuth} from '../../utils/auth';

interface OnlyAuthorizedRouteProps {
    element: any,
    redirectTo: string,
}

export const OnlyUnauthorizedRoute = ({ element, redirectTo }: OnlyAuthorizedRouteProps) => {
    const { user } = useAuth();
    return user ? <Navigate to={redirectTo} replace /> : element;
}