import {combineReducers} from 'redux';
import {ingredientsReducer} from './reducers/ingredientsReducer';
import {orderReducer} from './reducers/orderReducer';
import {registerReducer} from './reducers/registerReducer';
import {authReducer} from './reducers/authReducer';
import {forgotPasswordReducer} from './reducers/forgotPasswordReducer';
import {resetPasswordReducer} from './reducers/resetPasswordReducer';
import {userReducer} from './reducers/userReducer';
import {feedReducer} from './reducers/feedReducer';
import {userFeedReducer} from './reducers/userFeedReducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    register: registerReducer,
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer,
    feed: feedReducer,
    userFeed: userFeedReducer,
});