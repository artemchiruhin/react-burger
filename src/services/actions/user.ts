export const USER_DATA_EDIT_REQUEST = 'USER_DATA_EDIT_REQUEST';
export const USER_DATA_EDIT_SUCCESS = 'USER_DATA_EDIT_SUCCESS';
export const USER_DATA_EDIT_ERROR = 'USER_DATA_EDIT_ERROR';

export const makeEditDataRequest = () => ({
    type: USER_DATA_EDIT_REQUEST,
});

export const editDataWasSuccessful = () => ({
    type: USER_DATA_EDIT_SUCCESS,
});

export const editDataWasUnSuccessful = (error: string) => ({
    type: USER_DATA_EDIT_ERROR,
    payload: error,
});

interface IEditUserData {
    name: string,
    email: string,
    password: string,
    updateUser: Function,
}

export const editUserData = ({ name, email, password, updateUser }: IEditUserData) => (dispatch: any) => {
    dispatch(makeEditDataRequest());
    const newUserData: { name: string, email: string, password?: string } = { name, email };
    if(password) {
        newUserData.password = password;
    }
    updateUser(newUserData)
        .then(dispatch(editDataWasSuccessful()))
        .catch((error: any) => dispatch(editDataWasUnSuccessful(error)));
}