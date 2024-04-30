import {AppDispatch} from '../types';

export const USER_DATA_EDIT_REQUEST: 'USER_DATA_EDIT_REQUEST' = 'USER_DATA_EDIT_REQUEST';
export const USER_DATA_EDIT_SUCCESS: 'USER_DATA_EDIT_SUCCESS' = 'USER_DATA_EDIT_SUCCESS';
export const USER_DATA_EDIT_ERROR: 'USER_DATA_EDIT_ERROR' = 'USER_DATA_EDIT_ERROR';

export interface IMakeEditDataRequest {
    readonly type: typeof USER_DATA_EDIT_REQUEST,
}
export const makeEditDataRequest = (): IMakeEditDataRequest => ({
    type: USER_DATA_EDIT_REQUEST,
});

export interface IEditDataWasSuccessful {
    readonly type: typeof USER_DATA_EDIT_SUCCESS,
}
export const editDataWasSuccessful = (): IEditDataWasSuccessful => ({
    type: USER_DATA_EDIT_SUCCESS,
});

export interface IEditDataWasUnSuccessful {
    readonly type: typeof USER_DATA_EDIT_ERROR,
    readonly payload?: string,
}
export const editDataWasUnSuccessful = (error?: string): IEditDataWasUnSuccessful => ({
    type: USER_DATA_EDIT_ERROR,
    payload: error,
});

interface IEditUserData {
    name: string,
    email: string,
    password: string,
    updateUser: Function,
}

export const editUserData = ({ name, email, password, updateUser }: IEditUserData) => (dispatch: AppDispatch) => {
    dispatch(makeEditDataRequest());
    const newUserData: { name: string, email: string, password?: string } = { name, email };
    if(password) {
        newUserData.password = password;
    }
    updateUser(newUserData)
        .then(() => dispatch(editDataWasSuccessful()))
        .catch(() => dispatch(editDataWasUnSuccessful('При сохранении данных произошла ошибка')));
}

export type TUserActions =
    | IMakeEditDataRequest
    | IEditDataWasSuccessful
    | IEditDataWasUnSuccessful;