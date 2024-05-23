import {API_URL} from '../../constants';
import {AppDispatch} from '../types';

export const AUTH_REQUEST: 'AUTH_REQUEST' = 'AUTH_REQUEST';
export const AUTH_SUCCESS: 'AUTH_SUCCESS' = 'AUTH_SUCCESS';
export const AUTH_ERROR: 'AUTH_ERROR' = 'AUTH_ERROR';

export interface IMakeAuthRequest {
    readonly type: typeof AUTH_REQUEST,
}
export const makeAuthRequest = (): IMakeAuthRequest => ({
    type: AUTH_REQUEST,
});

export interface IAuthWasSuccessful {
    readonly type: typeof AUTH_SUCCESS,
}
export const authWasSuccessful = (): IAuthWasSuccessful => ({
    type: AUTH_SUCCESS,
});

export interface IAuthWasUnSuccessful {
    readonly type: typeof AUTH_ERROR,
    readonly payload?: string,
}
export const authWasUnSuccessful = (errorMassage?: string): IAuthWasUnSuccessful => ({
    type: AUTH_ERROR,
    payload: errorMassage,
});


interface IAuthorizeUser {
    email: string,
    password: string,
    signIn: Function,
}
export const authorizeUser = ({ email, password, signIn }: IAuthorizeUser) => (dispatch: AppDispatch) => {
    dispatch(makeAuthRequest());
    signIn(`${API_URL}/auth/login`, {
        email,
        password
    }).then(() => {
        dispatch(authWasSuccessful());
    }).catch(() => dispatch(authWasUnSuccessful('При авторизации произошла ошибка')));
}

export type TAuthActions =
    | IMakeAuthRequest
    | IAuthWasSuccessful
    | IAuthWasUnSuccessful;