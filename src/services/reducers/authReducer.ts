import {Nullable} from '../../types/Nullable';
import {AUTH_ERROR, AUTH_REQUEST, AUTH_SUCCESS, TAuthActions} from '../actions/auth';

interface IInitialState {
    isLoading: boolean,
    error: Nullable<string>,
}

export const initialState: IInitialState = {
    isLoading: false,
    error: null,
}

export const authReducer = (state = initialState, action: TAuthActions): IInitialState => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case AUTH_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            }
        default:
            return state;
    }
}