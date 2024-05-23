import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState} from '../types';

export const socketMiddleware = (wsActions: Record<string, string>): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: any) => {
            const { dispatch } = store;
            const { type, payload } = action;

            const {
                wsInit,
                wsClose,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage
            } = wsActions;

            if (type === wsInit && wsInit) {
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                }

                socket.onerror = event => {
                    dispatch({ type: onError });
                }

                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: onMessage, payload: data });
                }

                socket.onclose = event => {
                    dispatch({ type: onClose });
                }

                if (type === wsSendMessage && wsSendMessage) {
                    socket.send(JSON.stringify(payload));
                }

                if(type === wsClose && wsClose) {
                    socket.close();
                }
            }

            next(action);
        };
    }) as Middleware;
}