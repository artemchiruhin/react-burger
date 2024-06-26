import {IOrder} from '../../interfaces/IOrder';
import {
    FEED_CONNECTION_CLOSED,
    FEED_CONNECTION_ERROR,
    FEED_CONNECTION_SUCCESS,
    FEED_GET_MESSAGE, TFeedActions
} from '../actions/feed';

interface IInitialState {
    wsConnected: boolean;
    error?: Event;
    totalToday: number,
    total: number,
    orders: IOrder[],
}

const initialState: IInitialState = {
    wsConnected: false,
    totalToday: 0,
    total: 0,
    orders: [],
}

export const feedReducer = (state = initialState, action: TFeedActions) => {
    switch (action.type) {
        case FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            }
        case FEED_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            }
        case FEED_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        case FEED_GET_MESSAGE:
            const data = JSON.parse(action.payload);
            return {
                ...state,
                error: undefined,
                totalToday: data.totalToday,
                total: data.total,
                orders: data.orders as IOrder[],
            }
        default:
            return state;
    }
}