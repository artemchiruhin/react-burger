import {
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_LOADING,
    RESET_PASSWORD_SUCCESS,
    TResetPasswordActions
} from '../actions/resetPassword';
import {Nullable} from '../../types/Nullable';

interface IInitialState {
    isLoading: boolean,
    error: Nullable<string>,
}

export const initialState: IInitialState = {
    isLoading: false,
    error: null,
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions) => {
    switch (action.type) {
        case RESET_PASSWORD_LOADING:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}