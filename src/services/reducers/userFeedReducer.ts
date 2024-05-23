import {IOrder} from '../../interfaces/IOrder';
import {
    TUserFeedActions,
    USER_FEED_CONNECTION_CLOSED,
    USER_FEED_CONNECTION_ERROR,
    USER_FEED_CONNECTION_SUCCESS,
    USER_FEED_GET_MESSAGE
} from '../actions/userFeed';

interface IInitialState {
    wsConnected: boolean;
    error?: Event;
    orders: IOrder[],
}

const initialState: IInitialState = {
    wsConnected: false,
    orders: [],
}

export const userFeedReducer = (state = initialState, action: TUserFeedActions) => {
    switch (action.type) {
        case USER_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            }
        case USER_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            }
        case USER_FEED_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        case USER_FEED_GET_MESSAGE:
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