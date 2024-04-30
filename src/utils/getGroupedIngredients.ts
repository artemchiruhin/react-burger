import {IIngredient} from '../interfaces/IIngredient';

export const getGroupedIngredients = (ingredients: IIngredient[], ingredientsToGroup: string[]) => {
    const result: {[key: string]: { count: number, ingredient: IIngredient | undefined }} = {};
    ingredientsToGroup.forEach(item => {
        if(result.hasOwnProperty(item)) {
            result[item].count += 1;
            return;
        }
        const foundIngredient = ingredients.find(ingredient => ingredient._id === item);
        result[item] = {
            count: 1,
            ingredient: foundIngredient,
        }
    });
    return Object.values(result);
}