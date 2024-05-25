import * as uuid from 'uuid';
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk'
import {ingredientsReducer, initialState as reducerInitialState} from '../services/reducers/ingredientsReducer';
import {
    addIngredient, chooseBun,
    deleteIngredient, INGREDIENTS_LOADING, INGREDIENTS_SUCCESS,
    ingredientsRequestWasUnSuccessful, loadIngredients,
    makeIngredientsRequestAction, showIngredient, sortIngredients
} from "../services/actions/ingredients";

jest.mock('uuid');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ingredients reducer', () => {
    beforeEach(() => {
        jest.spyOn(uuid, 'v4').mockReturnValue('123');

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                result: 'OK',
            }),
            ok: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the initial state', () => {
        expect(
            ingredientsReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should add ingredient', () => {
        const ingredient = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }

        expect(
            ingredientsReducer(undefined, addIngredient(ingredient))
        ).toEqual({
            ingredients: [],
            error: null,
            isLoading: false,
            addedIngredients: [{ ...ingredient, sort: 1, uniqueId: uuid.v4() }],
            chosenBun: null,
            currentShowingIngredient: null,
        });
    });

    it('should delete ingredient', () => {
        const ingredient = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }
        const initialState = {
            ingredients: [],
            error: null,
            isLoading: false,
            addedIngredients: [{ ...ingredient, sort: 1, uniqueId: uuid.v4() }],
            chosenBun: null,
            currentShowingIngredient: null,
        }

        expect(
            ingredientsReducer(initialState, deleteIngredient('123'))
        ).toEqual({
            ingredients: [],
            error: null,
            isLoading: false,
            addedIngredients: [],
            chosenBun: null,
            currentShowingIngredient: null,
        });
    });

    it('should start fetch ingredients', () => {
        expect(
            ingredientsReducer(undefined, makeIngredientsRequestAction())
        ).toEqual({
            ...reducerInitialState,
            isLoading: true,
        })
    });

    it('should set error with failed ingredients request', () => {
        expect(
            ingredientsReducer(undefined, ingredientsRequestWasUnSuccessful('Ошибка'))
        ).toEqual({
            ...reducerInitialState,
            error: 'Ошибка',
            isLoading: false,
        })
    });

    it('should choose bun', () => {
        const bun = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }
        const initialState = {
            ingredients: [bun],
            error: null,
            isLoading: false,
            addedIngredients: [],
            chosenBun: null,
            currentShowingIngredient: null,
        }

        expect(
            ingredientsReducer(initialState, chooseBun(bun))
        ).toEqual({
            ingredients: [bun],
            error: null,
            isLoading: false,
            addedIngredients: [],
            chosenBun: { ...bun, uniqueId: uuid.v4() },
            currentShowingIngredient: null,
        });
    });

    it('should show ingredient', () => {
        const ingredient = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }
        const initialState = {
            ingredients: [ingredient],
            error: null,
            isLoading: false,
            addedIngredients: [],
            chosenBun: null,
            currentShowingIngredient: null,
        }

        expect(
            ingredientsReducer(initialState, showIngredient(ingredient))
        ).toEqual({
            ingredients: [ingredient],
            error: null,
            isLoading: false,
            addedIngredients: [],
            chosenBun: null,
            currentShowingIngredient: ingredient,
        });
    });

    it('should sort ingredients', () => {
        const ingredients = [
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0
            },
        ];
        const initialState = {
            ingredients: ingredients,
            error: null,
            isLoading: false,
            addedIngredients: ingredients,
            chosenBun: null,
            currentShowingIngredient: null,
        }

        expect(
            ingredientsReducer(initialState, sortIngredients(1, 0))
        ).toEqual({
            ingredients: ingredients,
            error: null,
            isLoading: false,
            addedIngredients: [
                {
                    "_id": "643d69a5c3f7b9001cfa0941",
                    "name": "Биокотлета из марсианской Магнолии",
                    "type": "main",
                    "proteins": 420,
                    "fat": 142,
                    "carbohydrates": 242,
                    "calories": 4242,
                    "price": 424,
                    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa093c",
                    "name": "Краторная булка N-200i",
                    "type": "bun",
                    "proteins": 80,
                    "fat": 24,
                    "carbohydrates": 53,
                    "calories": 420,
                    "price": 1255,
                    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    "__v": 0
                },
            ],
            chosenBun: null,
            currentShowingIngredient: null,
        })
    });
});