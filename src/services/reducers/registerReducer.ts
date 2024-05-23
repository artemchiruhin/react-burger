import {REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, TRegisterActions} from '../actions/register';

interface IInitialState {
    isLoading: boolean,
}

const initialState: IInitialState = {
    isLoading: false,
}

export const registerReducer = (state = initialState, action: TRegisterActions) => {
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
            }
        default:
            return state;
    }
}