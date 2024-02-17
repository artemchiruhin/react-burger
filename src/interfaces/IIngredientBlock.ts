import {IngredientType} from '../types/IngredientType';
import {IIngredient} from './IIngredient';

export interface IIngredientBlock {
    title: string,
    type: IngredientType,
    ingredients: IIngredient[],
    ref: any
}