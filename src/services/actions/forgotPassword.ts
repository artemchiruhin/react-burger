import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';
import {sendRecoveryPasswordLink} from '../../utils/api';

export const FORGOT_PASSWORD_LOADING = 'FORGOT_PASSWORD_LOADING';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const makeForgotPasswordRequest = () => ({
    type: FORGOT_PASSWORD_LOADING,
});

export const forgotPasswordRequestWasSuccessful = () => ({
    type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordRequestWasUnSuccessful = () => ({
    type: FORGOT_PASSWORD_ERROR,
});

interface IRecoveryLink {
    email: string,
}

export const sendRecoveryLink = ({ email }: IRecoveryLink) => (dispatch: any) => {
    dispatch(makeForgotPasswordRequest());
    sendRecoveryPasswordLink(`${API_URL}/password-reset`, { email })
        .then(checkResponse)
        .then(() => {
            dispatch(forgotPasswordRequestWasSuccessful());
            localStorage.setItem('recoveryLinkWasSent', 'Y');
        })
        .catch(() => dispatch(forgotPasswordRequestWasUnSuccessful()));
}