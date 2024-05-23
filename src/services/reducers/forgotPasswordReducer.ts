import {Nullable} from '../../types/Nullable';
import {
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_LOADING,
    FORGOT_PASSWORD_SUCCESS,
    TForgotPasswordActions
} from '../actions/forgotPassword';

interface IInitialState {
    isLoading: boolean,
    error: Nullable<string>,
}

const initialState: IInitialState = {
    isLoading: false,
    error: null,
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): IInitialState => {
    switch (action.type) {
        case FORGOT_PASSWORD_LOADING:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload || null,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        default:
            return state;
    }
}