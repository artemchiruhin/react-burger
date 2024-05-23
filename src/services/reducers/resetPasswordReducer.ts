import {
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_LOADING,
    RESET_PASSWORD_SUCCESS,
    TResetPasswordActions
} from '../actions/resetPassword';

interface IInitialState {
    isLoading: boolean,
}

const initialState: IInitialState = {
    isLoading: false,
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions) => {
    switch (action.type) {
        case RESET_PASSWORD_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                isLoading: false,
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