import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from '../actions/wsActions';
import {IOrder} from '../../interfaces/IOrder';

interface IInitialState {
    wsConnected: boolean;
    error?: Event;
    orders: IOrder[],
}

const initialState: IInitialState = {
    wsConnected: false,
    orders: [],
}

export const userFeedReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        case WS_GET_MESSAGE:
            const data = JSON.parse(action.payload);
            return {
                ...state,
                error: undefined,
                orders: data.orders as IOrder[],
            }
        default:
            return state;
    }
}