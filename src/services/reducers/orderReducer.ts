import {IOrder} from '../../interfaces/IOrder';
import {CREATE_ORDER_ERROR, CREATE_ORDER_LOADING, CREATE_ORDER_SUCCESS} from '../actions/order';

interface IInitialState {
    name: string,
    order: IOrder,
    success: boolean,
}

const initialState = {
    isLoading: false,
    error: null,
}

export const orderReducer = (state = initialState, action: any) => {
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
                order: action.payload.order,
            }
        default:
            return state;
    }
}