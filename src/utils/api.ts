import {API_URL} from '../constants';
import {checkResponse} from './checkResponse';
import {TRefreshResponse} from '../types/Responses';

export const refreshToken = () => {
    return fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
    })
        .then(response => checkResponse<TRefreshResponse>(response))
        .then(refreshData => {
            if(!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        })
}

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (error: any) {
        if(error.message !== "jwt expired") {
            return Promise.reject(error);
        }
        const refreshData = await refreshToken();
        if(options.headers) {
            (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
        }
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    }
}

interface IRegisterUserRequestData {
    email: string,
    password: string,
    name: string,
}
export const registerUserRequest = async (url: string, data: IRegisterUserRequestData) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

interface ILoginRequestData {
    email: string,
    password: string,
}
export const loginRequest = async (url: string, data: ILoginRequestData) => {
    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
};

export const getUserRequest = async <T>(url: string) => {
    return await fetchWithRefresh<T>(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken') || '',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
}

interface ISendRecoveryPasswordLinkData {
    email: string,
}
export const sendRecoveryPasswordLink = async (url: string, data: ISendRecoveryPasswordLinkData) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

interface IResetPasswordRequestData {
    password: string,
    token: string,
}
export const resetPasswordRequest = async (url: string, data: IResetPasswordRequestData) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

interface IEditUserRequestData {
    email: string,
    name: string,
    password?: string,
}
export const editUserDataRequest = async (url: string, data: IEditUserRequestData) => {
    return await fetchWithRefresh(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken') || ''
        },
        body: JSON.stringify(data),
    });
}

interface ILogoutRequestData {
    token: string,
}
export const logoutRequest = async (url: string, data: ILogoutRequestData) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}