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
/*interface IResetPassword {
    password: string,
    code: string,
}

export const resetPassword = ({ password, code }: IResetPassword) => (dispatch: any) => {
    dispatch({ type: RESET_PASSWORD_LOADING });
    fetch(`${API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            token: code,
        }),
    })
        .then(checkResponse)
        .then(data => {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
            localStorage.removeItem('recoveryLinkWasSent');
        })
        .catch(error => dispatch({ type: RESET_PASSWORD_ERROR, payload: 'При отправке кода прозошла ошибка'}));
}*/