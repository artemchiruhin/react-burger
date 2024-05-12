export const USER_FEED_CONNECTION_INIT: 'USER_FEED_CONNECTION_INIT' = 'USER_FEED_CONNECTION_INIT';
export const USER_FEED_CONNECTION_CLOSE: 'USER_FEED_CONNECTION_CLOSE' = 'USER_FEED_CONNECTION_CLOSE';
export const USER_FEED_CONNECTION_SUCCESS: 'USER_FEED_CONNECTION_SUCCESS' = 'USER_FEED_CONNECTION_SUCCESS';
export const USER_FEED_CONNECTION_CLOSED: 'USER_FEED_CONNECTION_CLOSED' = 'USER_FEED_CONNECTION_CLOSED';
export const USER_FEED_CONNECTION_ERROR: 'USER_FEED_CONNECTION_ERROR' = 'USER_FEED_CONNECTION_ERROR';
export const USER_FEED_GET_MESSAGE: 'USER_FEED_GET_MESSAGE' = 'USER_FEED_GET_MESSAGE';

export const userFeedWsActions = {
    wsInit: USER_FEED_CONNECTION_INIT,
    wsClose: USER_FEED_CONNECTION_CLOSE,
    onOpen: USER_FEED_CONNECTION_SUCCESS,
    onClose: USER_FEED_CONNECTION_CLOSED,
    onError: USER_FEED_CONNECTION_ERROR,
    onMessage: USER_FEED_GET_MESSAGE,
}

export interface IConnectUserFeedAction {
    readonly type: typeof USER_FEED_CONNECTION_INIT,
    readonly payload: string,
}
export const connectUserFeed = (url: string): IConnectUserFeedAction => ({
    type: USER_FEED_CONNECTION_INIT,
    payload: url,
});

export interface IDisconnectUserFeedAction {
    readonly type: typeof USER_FEED_CONNECTION_CLOSE,
}
export const disconnectUserFeed = (): IDisconnectUserFeedAction => ({
    type: USER_FEED_CONNECTION_CLOSE,
});

export interface IUserFeedConnectionSuccess {
    readonly type: typeof USER_FEED_CONNECTION_SUCCESS,
}

export interface IUserFeedConnectionClosed {
    readonly type: typeof USER_FEED_CONNECTION_CLOSED,
}

export interface IUserFeedConnectionError {
    readonly type: typeof USER_FEED_CONNECTION_ERROR,
    readonly payload: string,
}

export interface IUserFeedConnectionGetMessage {
    readonly type: typeof USER_FEED_GET_MESSAGE,
    readonly payload: string,
}

export type TUserFeedActions =
    | IConnectUserFeedAction
    | IDisconnectUserFeedAction
    | IUserFeedConnectionSuccess
    | IUserFeedConnectionClosed
    | IUserFeedConnectionError
    | IUserFeedConnectionGetMessage;