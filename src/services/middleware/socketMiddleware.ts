import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../types';
import {WS_CONNECTION_START} from '../actions/wsActions';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: any) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                }

                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                }

                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: 'WS_GET_MESSAGE', payload: data });
                }

                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                }

                if (type === 'WS_SEND_MESSAGE') {
                    socket.send(JSON.stringify(payload));
                }
            }

            next(action);
        };
    }) as Middleware;
}