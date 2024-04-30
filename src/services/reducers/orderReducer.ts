import {IOrder} from '../../interfaces/IOrder';
import {
    CREATE_ORDER_ERROR,
    CREATE_ORDER_LOADING,
    CREATE_ORDER_SUCCESS,
    TOrderActions
} from '../actions/order';
import {Nullable} from '../../types/Nullable';

interface IInitialState {
    isLoading: boolean,
    order?: IOrder,
    error: Nullable<string>,
}

const initialState: IInitialState = {
    isLoading: false,
    error: null,
}

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case CREATE_ORDER_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case CREATE_ORDER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                order: action.payload,
            }
        default:
            return state;
    }
}