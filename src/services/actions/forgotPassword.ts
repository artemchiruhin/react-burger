import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';

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

/*interface IRecoveryLink {
    email: string,
}

export const sendRecoveryLink = ({ email }: IRecoveryLink) => (dispatch: any) => {
    dispatch({ type: FORGOT_PASSWORD_LOADING });
    fetch(`${API_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    })
        .then(checkResponse)
        .then(data => {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS });
            localStorage.setItem('recoveryLinkWasSent', 'Y');
        })
        .catch(error => dispatch({ type: FORGOT_PASSWORD_ERROR, payload: 'При отправке кода прозошла ошибка'}));
}*/