import {API_URL} from '../../constants';
import {AppDispatch} from '../types';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_ERROR: 'REGISTER_ERROR' = 'REGISTER_ERROR';

export interface IMakeRegisterRequest {
    readonly type: typeof REGISTER_REQUEST,
}
export const makeRegisterRequest = (): IMakeRegisterRequest => ({
    type: REGISTER_REQUEST,
});

export interface IRegisterRequestWasSuccessful {
    readonly type: typeof REGISTER_SUCCESS,
}
export const registerRequestWasSuccessful = (): IRegisterRequestWasSuccessful => ({
    type: REGISTER_SUCCESS,
});

export interface IRegisterRequestWasUnSuccessful {
    readonly type: typeof REGISTER_ERROR,
}
export const registerRequestWasUnSuccessful = (): IRegisterRequestWasUnSuccessful => ({
    type: REGISTER_ERROR,
});

interface IRegisterUser {
    email: string,
    name: string,
    password: string,
    signUp: Function,
}

export const registerUser = ({ email, name, password, signUp }: IRegisterUser) => (dispatch: AppDispatch) => {
    dispatch(makeRegisterRequest());
    signUp(`${API_URL}/auth/register`, {
        name, email, password
    }).then(() => {
        dispatch(registerRequestWasSuccessful());
    }).catch(() => dispatch(registerRequestWasUnSuccessful()));
}

export type TRegisterActions =
    | IMakeRegisterRequest
    | IRegisterRequestWasSuccessful
    | IRegisterRequestWasUnSuccessful;