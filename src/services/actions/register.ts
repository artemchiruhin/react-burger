import {API_URL} from '../../constants';

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

interface IRegisterUser {
    email: string,
    name: string,
    password: string,
    signUp: Function,
}

export const registerUser = ({ email, name, password, signUp }: IRegisterUser) => (dispatch: any) => {
    dispatch(makeRegisterRequest());
    signUp(`${API_URL}/auth/register`, {
        name, email, password
    }).then(() => {
        dispatch(registerRequestWasSuccessful());
    }).catch(() => dispatch(registerRequestWasUnSuccessful()));
}