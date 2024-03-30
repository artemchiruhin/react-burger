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