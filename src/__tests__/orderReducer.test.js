import {orderReducer, initialState as reducerInitialState} from "../services/reducers/orderReducer";
import {
    createOrderRequest,
    createOrderRequestWasSuccessful,
    createOrderRequestWasUnSuccessful, getOrderRequestSuccess, makeGetOrderRequest
} from "../services/actions/order";

describe('order reducer', () => {
    it('should return initial state', () => {
        expect(
            orderReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should start save order request', () => {
        expect(
            orderReducer(undefined, createOrderRequest())
        ).toEqual({
            ...reducerInitialState,
            isLoading: true,
        });
    });

    it('should set error with failed save request', () => {
        expect(
            orderReducer(undefined, createOrderRequestWasUnSuccessful('Ошибка'))
        ).toEqual({
            ...reducerInitialState,
            error: 'Ошибка',
        })
    });

    it('should reset loading with successful save request', () => {
        expect(
            orderReducer(undefined, createOrderRequestWasSuccessful())
        ).toEqual({
            ...reducerInitialState,
            isLoading: false,
        })
    });

    it('should start get order request', () => {
        expect(
            orderReducer(undefined, makeGetOrderRequest())
        ).toEqual({
            ...reducerInitialState,
            isOrderLoading: true,
        });
    });

    it('should reset loading with successful get order request', () => {
        const order = {
            "_id": "6630876197ede0001d0683f7",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0942",
                "643d69a5c3f7b9001cfa0942",
                "643d69a5c3f7b9001cfa0942",
                "643d69a5c3f7b9001cfa0944",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d"
            ],
            "owner": "662f5b4197ede0001d0681b1",
            "status": "done",
            "name": "Традиционный-галактический флюоресцентный spicy бургер",
            "createdAt": "2024-04-30T05:53:37.177Z",
            "updatedAt": "2024-04-30T05:53:37.793Z",
            "number": 38936,
            "__v": 0
        }

        expect(
            orderReducer(undefined, getOrderRequestSuccess(order))
        ).toEqual({
            ...reducerInitialState,
            loadedOrder: order,
        });
    });
});