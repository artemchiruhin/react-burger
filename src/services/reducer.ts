import {combineReducers} from 'redux';
import {ingredientsReducer} from './reducers/ingredientsReducer';
import {orderReducer} from './reducers/orderReducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
});