import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';

export const CREATE_ORDER_LOADING = 'CREATE_ORDER_LOADING';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

interface IData {
    ingredients: string[],
}

export const createOrder = (data: IData) => (dispatch: any) => {
    dispatch({ type: CREATE_ORDER_LOADING });
    fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    })
        .then(checkResponse)
        .then(response => dispatch({ type: CREATE_ORDER_SUCCESS, payload: response }))
        .catch(error => dispatch({ type: CREATE_ORDER_ERROR, payload: 'При сохранении заказа произошла ошибка' }))
}