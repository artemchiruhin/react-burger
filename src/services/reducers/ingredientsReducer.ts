import {IIngredient} from '../../interfaces/IIngredient';
import {Nullable} from '../../types/Nullable';
import {
    INGREDIENTS_ERROR,
    INGREDIENTS_LOADING,
    INGREDIENTS_SUCCESS,
    ADD_INGREDIENT,
    DELETE_INGREDIENT, CHOOSE_BUN, SHOW_INGREDIENT, SORT_INGREDIENTS
} from '../actions/ingredients';

interface IInitialState {
    ingredients: IIngredient[],
    error: Nullable<string>,
    isLoading: boolean,
    addedIngredients: IIngredient[],
    chosenBun: IIngredient | null,
    currentShowingIngredient: IIngredient | null,
}

const initialState: IInitialState = {
    ingredients: [],
    error: null,
    isLoading: false,
    addedIngredients: [],
    chosenBun: null,
    currentShowingIngredient: null,
}

export const ingredientsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                addedIngredients: [...state.addedIngredients, {...action.payload, sort: state.addedIngredients.length + 1}],
            }
        case DELETE_INGREDIENT:
            return {
                ...state,
                addedIngredients: state.addedIngredients.filter((ingredient: IIngredient) => ingredient.uniqueId !== action.payload),
            }
        case CHOOSE_BUN:
            return {
                ...state,
                chosenBun: action.payload,
            }
        case INGREDIENTS_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                isLoading: false,
                error: null,
            }
        case INGREDIENTS_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case SHOW_INGREDIENT:
            return {
                ...state,
                currentShowingIngredient: action.payload,
            }
        case SORT_INGREDIENTS: {
            const ingredient = state.addedIngredients[action.payload.ingredientIndexToDelete];
            const updatedIngredients = state.addedIngredients.slice();
            updatedIngredients.splice(action.payload.ingredientIndexToDelete, 1);
            updatedIngredients.splice(action.payload.indexToInsert, 0, ingredient);
            return {
                ...state,
                addedIngredients: [...updatedIngredients],
            }
        }
        default:
            return state;
    }
}