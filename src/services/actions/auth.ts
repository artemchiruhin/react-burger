import {API_URL} from '../../constants';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const makeAuthRequest = () => ({
    type: AUTH_REQUEST,
});

export const authWasSuccessful = () => ({
    type: AUTH_SUCCESS,
});

export const authWasUnSuccessful = (errorMassage?: string) => ({
    type: AUTH_ERROR,
    payload: errorMassage,
});

interface IAuthorizeUser {
    email: string,
    password: string,
    signIn: Function,
}

export const authorizeUser = ({ email, password, signIn }: IAuthorizeUser) => (dispatch: any) => {
    dispatch(makeAuthRequest());
    signIn(`${API_URL}/auth/login`, {
        email,
        password
    }).then(() => {
        dispatch(authWasSuccessful());
    }).catch((error: any) => dispatch(authWasUnSuccessful('При авторизации произошла ошибка')));
}