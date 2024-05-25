import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';
import {sendRecoveryPasswordLink} from '../../utils/api';
import {AppDispatch} from '../types';

export const FORGOT_PASSWORD_LOADING: 'FORGOT_PASSWORD_LOADING' = 'FORGOT_PASSWORD_LOADING';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' = 'FORGOT_PASSWORD_ERROR';

export interface IMakeForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_LOADING,
}
export const makeForgotPasswordRequest = () => ({
    type: FORGOT_PASSWORD_LOADING,
});

export interface IForgotPasswordRequestWasSuccessful {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS,
}
export const forgotPasswordRequestWasSuccessful = () => ({
    type: FORGOT_PASSWORD_SUCCESS,
});

export interface IForgotPasswordRequestWasUnSuccessful {
    readonly type: typeof FORGOT_PASSWORD_ERROR,
    readonly payload: string,
}
export const forgotPasswordRequestWasUnSuccessful = (errorMessage: string): IForgotPasswordRequestWasUnSuccessful => ({
    type: FORGOT_PASSWORD_ERROR,
    payload: errorMessage,
});

interface IRecoveryLink {
    email: string,
}

export const sendRecoveryLink = ({ email }: IRecoveryLink) => (dispatch: AppDispatch) => {
    dispatch(makeForgotPasswordRequest());
    sendRecoveryPasswordLink(`${API_URL}/password-reset`, { email })
        .then(checkResponse)
        .then(() => {
            dispatch(forgotPasswordRequestWasSuccessful());
            localStorage.setItem('recoveryLinkWasSent', 'Y');
        })
        .catch(() => dispatch(forgotPasswordRequestWasUnSuccessful('При отправке ссылки произошла ошибка')));
}

export type TForgotPasswordActions =
    | IMakeForgotPasswordRequest
    | IForgotPasswordRequestWasSuccessful
    | IForgotPasswordRequestWasUnSuccessful;