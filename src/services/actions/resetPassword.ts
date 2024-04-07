import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';
import {resetPasswordRequest} from '../../utils/api';

export const RESET_PASSWORD_LOADING = 'RESET_PASSWORD_LOADING';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const makeResetPasswordRequest = () => ({
    type: RESET_PASSWORD_LOADING,
});

export const resetPasswordRequestWasSuccessful = () => ({
    type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordRequestWasUnSuccessful = () => ({
    type: RESET_PASSWORD_ERROR,
});

interface IResetPassword {
    password: string,
    code: string,
}

export const resetPassword = ({ password, code }: IResetPassword) => (dispatch: any) => {
    dispatch(makeResetPasswordRequest());
    resetPasswordRequest(`${API_URL}/password-reset/reset`, { password, token: code })
        .then(checkResponse)
        .then(() => {
            dispatch(resetPasswordRequestWasSuccessful());
            localStorage.removeItem('recoveryLinkWasSent');
        })
        .catch(() => dispatch(resetPasswordRequestWasUnSuccessful()));
}