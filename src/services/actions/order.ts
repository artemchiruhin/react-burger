import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';
import {IOrder} from '../../interfaces/IOrder';
import {TCreateOrderResponse, TGetOrderResponse} from '../../types/Responses';
import {AppDispatch} from '../types';

export const CREATE_ORDER_LOADING: 'CREATE_ORDER_LOADING' = 'CREATE_ORDER_LOADING';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';

export const GET_ORDER_LOADING: 'GET_ORDER_LOADING' = 'GET_ORDER_LOADING';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';

interface IData {
    ingredients: string[],
}

export interface ICreateOrderRequest {
    readonly type: typeof CREATE_ORDER_LOADING,
}
export const createOrderRequest = (): ICreateOrderRequest => ({
    type: CREATE_ORDER_LOADING,
});

export interface ICreateOrderRequestWasSuccessful {
    readonly type: typeof CREATE_ORDER_SUCCESS,
    readonly payload: IOrder,
}
export const createOrderRequestWasSuccessful = (order: IOrder): ICreateOrderRequestWasSuccessful => ({
    type: CREATE_ORDER_SUCCESS,
    payload: order,
});

export interface ICreateOrderRequestWasUnSuccessful {
    readonly type: typeof CREATE_ORDER_ERROR,
    readonly payload?: string,
}
export const createOrderRequestWasUnSuccessful = (errorMessage?: string): ICreateOrderRequestWasUnSuccessful => ({
    type: CREATE_ORDER_ERROR,
    payload: errorMessage,
});

export const createOrder = (data: IData) => (dispatch: AppDispatch) => {
    dispatch(createOrderRequest());
    fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('accessToken') || ''
        },
        body: JSON.stringify(data),
    })
        .then(response => checkResponse<TCreateOrderResponse>(response))
        .then(responseData => dispatch(createOrderRequestWasSuccessful(responseData.order)))
        .catch(() => dispatch(createOrderRequestWasUnSuccessful('При сохранении заказа произошла ошибка')))
}

export interface IMakeGetOrderRequest {
    readonly type: typeof GET_ORDER_LOADING,
}
export const makeGetOrderRequest = (): IMakeGetOrderRequest => ({
    type: GET_ORDER_LOADING,
});

export interface IGetOrderRequestSuccess {
    readonly type: typeof GET_ORDER_SUCCESS,
    readonly payload: IOrder,
}
export const getOrderRequestSuccess = (order: IOrder): IGetOrderRequestSuccess => ({
    type: GET_ORDER_SUCCESS,
    payload: order,
});

export interface IGetOrderRequestError {
    readonly type: typeof GET_ORDER_ERROR,
    readonly payload: string,
}
export const getOrderRequestError = (error: string): IGetOrderRequestError => ({
    type: GET_ORDER_ERROR,
    payload: error,
});

export const fetchOrder = (id: string) => (dispatch: AppDispatch) => {
    dispatch(makeGetOrderRequest());
    fetch(`${API_URL}/orders/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then(response => checkResponse<TGetOrderResponse>(response))
        .then(data => dispatch(getOrderRequestSuccess(data.orders[0])))
        .catch(() => dispatch(getOrderRequestError('При сохранении заказа произошла ошибка')))
}

export type TOrderActions =
    | ICreateOrderRequest
    | ICreateOrderRequestWasSuccessful
    | ICreateOrderRequestWasUnSuccessful
    | IMakeGetOrderRequest
    | IGetOrderRequestSuccess
    | IGetOrderRequestError;