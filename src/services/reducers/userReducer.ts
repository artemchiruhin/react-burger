import {Nullable} from '../../types/Nullable';
import {TUserActions, USER_DATA_EDIT_ERROR, USER_DATA_EDIT_REQUEST, USER_DATA_EDIT_SUCCESS} from '../actions/user';

interface IInitialState {
    isLoading: boolean,
    error: Nullable<string>,
}

export const initialState: IInitialState = {
    isLoading: false,
    error: null,
}

export const userReducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
        case USER_DATA_EDIT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case USER_DATA_EDIT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        case USER_DATA_EDIT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}