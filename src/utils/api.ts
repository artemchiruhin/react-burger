import {API_URL} from '../constants';
import {checkResponse} from './checkResponse';

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
        .then(checkResponse)
        .then(refreshData => {
            if(!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        })
}

export const fetchWithRefresh = async (url: string, options: any) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (error: any) {
        if(error.message !== "jwt expired") {
            return Promise.reject(error);
        }
        const refreshData = await refreshToken();
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
    }
}

export const registerUserRequest = async (url: string, data: any) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export const loginRequest = async (url: string, data: any) => {
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

export const getUserRequest = async (url: string) => {
    return await fetchWithRefresh(url, {
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

export const sendRecoveryPasswordLink = async (url: string, data: any) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export const resetPasswordRequest = async (url: string, data: any) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export const editUserDataRequest = async (url: string, data: any) => {
    return await fetchWithRefresh(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data),
    });
}

export const logoutRequest = async (url: string, data: any) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}