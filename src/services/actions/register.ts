export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const makeRegisterRequest = () => ({
    type: REGISTER_REQUEST,
});

export const registerRequestWasSuccessful = () => ({
    type: REGISTER_SUCCESS,
});

export const registerRequestWasUnSuccessful = () => ({
    type: REGISTER_ERROR,
});

/*interface IRegisterUser {
    email: string,
    name: string,
    password: string,
}

export const registerUser = ({ email, name, password }: IRegisterUser) => (dispatch: any) => {
    dispatch({ type: REGISTER_REQUEST });
    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            name,
            password,
        }),
    })
        .then(checkResponse)
        .then(data => dispatch({ type: REGISTER_SUCCESS }))
        .catch(error => dispatch({ type: REGISTER_ERROR, payload: 'При регистрации прозошла ошибка'}));
}*/