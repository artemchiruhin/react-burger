import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';
import {resetPasswordRequest} from '../../utils/api';
import {AppDispatch} from '../types';

export const RESET_PASSWORD_LOADING: 'RESET_PASSWORD_LOADING' = 'RESET_PASSWORD_LOADING';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR' = 'RESET_PASSWORD_ERROR';

export interface IMakePasswordRequest {
    readonly type: typeof RESET_PASSWORD_LOADING,
}
export const makeResetPasswordRequest = (): IMakePasswordRequest => ({
    type: RESET_PASSWORD_LOADING,
});

export interface IResetPasswordRequestWasSuccessful {
    readonly type: typeof RESET_PASSWORD_SUCCESS,
}
export const resetPasswordRequestWasSuccessful = (): IResetPasswordRequestWasSuccessful => ({
    type: RESET_PASSWORD_SUCCESS,
});

export interface IResetPasswordRequestWasUnSuccessful {
    readonly type: typeof RESET_PASSWORD_ERROR,
}
export const resetPasswordRequestWasUnSuccessful = (): IResetPasswordRequestWasUnSuccessful => ({
    type: RESET_PASSWORD_ERROR,
});

interface IResetPassword {
    password: string,
    code: string,
}

export const resetPassword = ({ password, code }: IResetPassword) => (dispatch: AppDispatch) => {
    dispatch(makeResetPasswordRequest());
    resetPasswordRequest(`${API_URL}/password-reset/reset`, { password, token: code })
        .then(checkResponse)
        .then(() => {
            dispatch(resetPasswordRequestWasSuccessful());
            localStorage.removeItem('recoveryLinkWasSent');
        })
        .catch(() => dispatch(resetPasswordRequestWasUnSuccessful()));
}

export type TResetPasswordActions =
    | IMakePasswordRequest
    | IResetPasswordRequestWasSuccessful
    | IResetPasswordRequestWasUnSuccessful;