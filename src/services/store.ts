import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducer';
import {socketMiddleware} from './middleware/socketMiddleware';
import {feedWsActions} from './actions/feed';
import {userFeedWsActions} from './actions/userFeed';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
            .concat(socketMiddleware(feedWsActions))
            .concat(socketMiddleware(userFeedWsActions))
    }
});