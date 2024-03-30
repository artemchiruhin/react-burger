import {REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS} from '../actions/register';
import {Nullable} from '../../types/Nullable';

interface IInitialState {
    isLoading: boolean,
    error: Nullable<string>,
}

const initialState: IInitialState = {
    isLoading: false,
    error: null,
}

export const registerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,

            }
        case REGISTER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}