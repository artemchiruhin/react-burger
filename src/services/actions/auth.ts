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

/*export const authorizeUser = ({ email, password }: IAuthorizeUser) => (dispatch: any) => {
    dispatch({ type: AUTH_REQUEST });
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then(checkResponse)
        .then(data => {
            dispatch({ type: AUTH_SUCCESS });
        })
        .catch(error => dispatch({ type: AUTH_ERROR, payload: 'При авторизации прозошла ошибка'}));
}*/