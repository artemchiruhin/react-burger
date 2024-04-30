import {store} from '../store';
import {TAuthActions} from '../actions/auth';
import {TForgotPasswordActions} from '../actions/forgotPassword';
import {TIngredientsActions} from '../actions/ingredients';
import {TOrderActions} from '../actions/order';
import {TRegisterActions} from '../actions/register';
import {TUserActions} from '../actions/user';

export type AppActions =
    | TAuthActions
    | TForgotPasswordActions
    | TIngredientsActions
    | TOrderActions
    | TRegisterActions
    | TUserActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;