import {useContext, useState, createContext, ReactNode, useEffect} from 'react';
import {getUserRequest, loginRequest, logoutRequest, registerUserRequest} from './api';
import {API_URL} from '../constants';
import {checkResponse} from './checkResponse';

const AuthContext = createContext(undefined);

interface IProvideAuth {
    children: ReactNode,
}
export function ProvideAuth({ children }: IProvideAuth) {
    const auth = useProvideAuth();
    return (
        // @ts-ignore
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        return await getUserRequest(`${API_URL}/auth/user`)
            .then(data => {
                if (data.success) {
                    setUser({ ...data.user });
                }
                return data.success;
            }).catch(() => setUser(null));
    }

    const signIn = async (url: string, user: any) => {
        const data = await loginRequest(url, user)
            .then(checkResponse)
            .then(data => data);

        if (data.success) {
            setUser({ ...data.user });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        }
    }

    const signUp = async (url: string, data: any) => {
        const responseData = await registerUserRequest(`${API_URL}/auth/register`, data)
            .then(checkResponse)
            .then(responseData => responseData);

        if(responseData.success) {
            setUser({ ...responseData.user });
            localStorage.setItem('accessToken', responseData.accessToken);
            localStorage.setItem('refreshToken', responseData.refreshToken);
        }
    }

    /*useEffect(() => {
        void getUser();
    }, []);*/

    const signOut = async () => {
        return await logoutRequest(`${API_URL}/auth/logout`, { token: localStorage.getItem('refreshToken') })
            .then(checkResponse)
            .then(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setUser(null);
            });
    };

    return {
        user,
        setUser,
        getUser,
        signIn,
        signUp,
        signOut
    };
}