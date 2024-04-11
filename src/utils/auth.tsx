import {useContext, useState, createContext, ReactNode} from 'react';
import {editUserDataRequest, getUserRequest, loginRequest, logoutRequest, registerUserRequest} from './api';
import {API_URL} from '../constants';
import {checkResponse} from './checkResponse';
import {IUser} from '../interfaces/IUser';
import {TGetUserResponse, TSignInResponse, TSignUpResponse} from '../types/Responses';

interface IAuthContext {
    user: IUser | null,
    getUser: Function,
    setUser: Function,
    signIn: Function,
    signUp: Function,
    signOut: Function,
    updateUser: Function,
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {},
    getUser: () => {},
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
    updateUser: () => {},
});

interface IProvideAuth {
    children: ReactNode,
}
export function ProvideAuth({ children }: IProvideAuth) {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState<IUser | null>(null);

    const getUser = async () => {
        return await getUserRequest<TGetUserResponse>(`${API_URL}/auth/user`)
            .then(data => {
                if (data.success) {
                    setUser({ ...data.user });
                }
                return data.success;
            }).catch(() => setUser(null));
    }

    const signIn = async (url: string, user: any) => {
        const data = await loginRequest(url, user)
            .then(response => checkResponse<TSignInResponse>(response))
            .then(data => data);

        if (data.success) {
            setUser({ ...data.user });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        }
    }

    const signUp = async (url: string, data: any) => {
        const responseData = await registerUserRequest(url, data)
            .then(response => checkResponse<TSignUpResponse>(response))
            .then(responseData => responseData);

        if(responseData.success) {
            setUser({ ...responseData.user });
            localStorage.setItem('accessToken', responseData.accessToken);
            localStorage.setItem('refreshToken', responseData.refreshToken);
        }
    }

    const signOut = async () => {
        return await logoutRequest(`${API_URL}/auth/logout`, {
            token: localStorage.getItem('refreshToken') || ''
        })
            .then(checkResponse)
            .then(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setUser(null);
            });
    };

    const updateUser = async (newUserData: any) => {
        return await editUserDataRequest(`${API_URL}/auth/user`, newUserData)
            .then(() => {
                setUser({
                    ...newUserData,
                })
            });
    }

    return {
        user,
        setUser,
        getUser,
        signIn,
        signUp,
        signOut,
        updateUser,
    };
}