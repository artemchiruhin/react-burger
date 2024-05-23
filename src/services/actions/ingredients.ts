import { v4 as uuidv4 } from 'uuid';
import {IIngredient} from '../../interfaces/IIngredient';
import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';
import {TIngredientsResponse} from '../../types/Responses';
import {AppDispatch} from '../types';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const CHOOSE_BUN: 'CHOOSE_BUN' = 'CHOOSE_BUN';
export const SHOW_INGREDIENT: 'SHOW_INGREDIENT' = 'SHOW_INGREDIENT';
export const INGREDIENTS_LOADING: 'INGREDIENTS_LOADING' = 'INGREDIENTS_LOADING';
export const INGREDIENTS_SUCCESS: 'INGREDIENTS_SUCCESS' = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR: 'INGREDIENTS_ERROR' = 'INGREDIENTS_ERROR';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT,
    readonly payload: IIngredient,
}
export const addIngredient = (ingredient: IIngredient): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    payload: { ...ingredient, uniqueId: uuidv4() }
});

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT,
    readonly payload: string,
}
export const deleteIngredient = (id: string): IDeleteIngredientAction => ({
    type: DELETE_INGREDIENT,
    payload: id,
});

export interface IMakeIngredientsRequestAction {
    readonly type: typeof INGREDIENTS_LOADING,
}
export const makeIngredientsRequestAction = (): IMakeIngredientsRequestAction => ({
    type: INGREDIENTS_LOADING,
});

export interface IIngredientsRequestWasSuccessful {
    readonly type: typeof INGREDIENTS_SUCCESS,
    readonly payload: IIngredient[],
}
export const ingredientsRequestWasSuccessful = (ingredients: IIngredient[]): IIngredientsRequestWasSuccessful => ({
    type: INGREDIENTS_SUCCESS,
    payload: ingredients,
});

export interface IIngredientsRequestWasUnSuccessful {
    readonly type: typeof INGREDIENTS_ERROR,
    readonly payload?: string,
}
export const ingredientsRequestWasUnSuccessful = (errorMessage?: string) => ({
    type: INGREDIENTS_ERROR,
    payload: errorMessage,
});
export const loadIngredients = () => (dispatch: AppDispatch) => {
    dispatch(makeIngredientsRequestAction());
    fetch(`${API_URL}/ingredients`)
        .then(response => checkResponse<TIngredientsResponse>(response))
        .then(data => dispatch(ingredientsRequestWasSuccessful(data.data)))
        .catch(() => dispatch(ingredientsRequestWasUnSuccessful('Произошла ошибка, обновите страницу')));
}

export interface IChooseBunAction {
    readonly type: typeof CHOOSE_BUN,
    readonly payload: IIngredient,
}
export const chooseBun = (bun: IIngredient): IChooseBunAction => ({
    type: CHOOSE_BUN,
    payload: { ...bun, uniqueId: uuidv4() }
});

export interface IShowIngredientAction {
    readonly type: typeof SHOW_INGREDIENT,
    readonly payload: IIngredient | undefined,
}
export const showIngredient = (ingredient: IIngredient | undefined): IShowIngredientAction => ({
    type: SHOW_INGREDIENT,
    payload: ingredient,
});

export interface ISortIngredientsAction {
    readonly type: typeof SORT_INGREDIENTS,
    readonly payload: { ingredientIndexToDelete: number, indexToInsert: number }
}
export const sortIngredients = (ingredientIndexToDelete: number, indexToInsert: number): ISortIngredientsAction => ({
    type: SORT_INGREDIENTS,
    payload: {
        ingredientIndexToDelete,
        indexToInsert,
    }
});

export type TIngredientsActions =
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IMakeIngredientsRequestAction
    | IIngredientsRequestWasSuccessful
    | IIngredientsRequestWasUnSuccessful
    | IChooseBunAction
    | IShowIngredientAction
    | ISortIngredientsAction;