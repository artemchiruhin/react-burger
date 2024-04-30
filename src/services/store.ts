import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducer';
import {socketMiddleware} from './middleware/socketMiddleware';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(socketMiddleware())
    }
});