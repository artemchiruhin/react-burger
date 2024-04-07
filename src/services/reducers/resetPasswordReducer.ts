import {Nullable} from '../../types/Nullable';
import {RESET_PASSWORD_ERROR, RESET_PASSWORD_LOADING, RESET_PASSWORD_SUCCESS} from '../actions/resetPassword';

interface IInitialState {
    isLoading: boolean,
    error: Nullable<string>,
}

const initialState: IInitialState = {
    isLoading: false,
    error: null,
}

export const resetPasswordReducer = (state = initialState, action: any) => {
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
                error: null,
            }
        default:
            return state;
    }
}