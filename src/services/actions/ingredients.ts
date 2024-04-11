import { v4 as uuidv4 } from 'uuid';
import {IIngredient} from '../../interfaces/IIngredient';
import {API_URL} from '../../constants';
import {checkResponse} from '../../utils/checkResponse';
import {TIngredientsResponse} from '../../types/Responses';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CHOOSE_BUN = 'CHOOSE_BUN';
export const SHOW_INGREDIENT = 'SHOW_INGREDIENT';
export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const addIngredient = (ingredient: IIngredient) => {
    return {
        type: ADD_INGREDIENT,
        payload: { ...ingredient, uniqueId: uuidv4() }
    }
}

export const deleteIngredient = (id: string) => {
    return {
        type: DELETE_INGREDIENT,
        payload: id
    }
}

export const loadIngredients = () => (dispatch: any) => {
    dispatch({ type: INGREDIENTS_LOADING });
    fetch(`${API_URL}/ingredients`)
        .then(response => checkResponse<TIngredientsResponse>(response))
        .then(data => dispatch({ type: INGREDIENTS_SUCCESS, payload: data.data }))
        .catch(error => dispatch({ type: INGREDIENTS_ERROR, payload: 'Произошла ошибка, обновите страницу' }));
}

export const chooseBun = (bun: IIngredient) => {
    return {
        type: CHOOSE_BUN,
        payload: { ...bun, uniqueId: uuidv4() }
    }
}

export const showIngredient = (ingredient: IIngredient | null) => {
    return {
        type: SHOW_INGREDIENT,
        payload: ingredient,
    }
}

export const sortIngredients = (ingredientIndexToDelete: number, indexToInsert: number) => {
    return {
        type: SORT_INGREDIENTS,
        payload: {
            ingredientIndexToDelete,
            indexToInsert,
        }
    }
}