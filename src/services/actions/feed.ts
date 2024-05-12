export const FEED_CONNECTION_INIT: 'FEED_CONNECTION_INIT' = 'FEED_CONNECTION_INIT';
export const FEED_CONNECTION_CLOSE: 'FEED_CONNECTION_CLOSE' = 'FEED_CONNECTION_CLOSE';
export const FEED_CONNECTION_SUCCESS: 'FEED_CONNECTION_SUCCESS' = 'FEED_CONNECTION_SUCCESS';
export const FEED_CONNECTION_CLOSED: 'FEED_CONNECTION_CLOSED' = 'FEED_CONNECTION_CLOSED';
export const FEED_CONNECTION_ERROR: 'FEED_CONNECTION_ERROR' = 'FEED_CONNECTION_ERROR';
export const FEED_GET_MESSAGE: 'FEED_GET_MESSAGE' = 'FEED_GET_MESSAGE';

export const feedWsActions = {
    wsInit: FEED_CONNECTION_INIT,
    wsClose: FEED_CONNECTION_CLOSE,
    onOpen: FEED_CONNECTION_SUCCESS,
    onClose: FEED_CONNECTION_CLOSED,
    onError: FEED_CONNECTION_ERROR,
    onMessage: FEED_GET_MESSAGE,
}

export interface IConnectFeedAction {
    readonly type: typeof FEED_CONNECTION_INIT,
    readonly payload: string,
}
export const connectFeed = (url: string): IConnectFeedAction => ({
    type: FEED_CONNECTION_INIT,
    payload: url,
});

export interface IDisconnectFeedAction {
    readonly type: typeof FEED_CONNECTION_CLOSE,
}
export const disconnectFeed = (): IDisconnectFeedAction => ({
    type: FEED_CONNECTION_CLOSE,
});

export interface IFeedConnectionSuccess {
    readonly type: typeof FEED_CONNECTION_SUCCESS,
}

export interface IFeedConnectionClosed {
    readonly type: typeof FEED_CONNECTION_CLOSED,
}

export interface IFeedConnectionError {
    readonly type: typeof FEED_CONNECTION_ERROR,
    readonly payload: string,
}

export interface IFeedConnectionGetMessage {
    readonly type: typeof FEED_GET_MESSAGE,
    readonly payload: string,
}

export type TFeedActions =
    | IConnectFeedAction
    | IDisconnectFeedAction
    | IFeedConnectionSuccess
    | IFeedConnectionClosed
    | IFeedConnectionError
    | IFeedConnectionGetMessage;