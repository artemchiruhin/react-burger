import React, {useEffect} from 'react';
import styles from './ingredient-details.module.css';
import {useParams} from 'react-router-dom';
import {IIngredient} from '../../interfaces/IIngredient';
import {showIngredient} from '../../services/actions/ingredients';
import {useSelector, useDispatch} from '../../hooks/store';

export const IngredientDetails = () => {
    const { id } = useParams();
    const { currentShowingIngredient: ingredient, ingredients } = useSelector((store) => store.ingredients);
    const dispatch = useDispatch();

    useEffect(() => {
        const foundIngredient = ingredients.find((item: IIngredient) => item._id === id);
        dispatch(showIngredient(foundIngredient));
    }, [dispatch, id, ingredients]);

    if(!ingredient) return null;

    return (
        <div className={`${styles['content-wrapper']}`}>
            <div className={`${styles['image-wrapper']} pl-5 pr-5 mb-4`}>
                <img src={ingredient.image_large} className={`${styles['modal-image']}`} alt={ingredient.name}/>
            </div>
            <div className='text text_type_main-medium mb-8'>{ingredient.name}</div>
            <div className={`${styles['ingredient-properties']} text text_type_main-default text_color_inactive`}>
                <div className={`${styles['ingredient-property']}`}>
                    <span>Калории,ккал</span>
                    <span className='text text_type_digits-default'>{ingredient.calories}</span>
                </div>
                <div className={`${styles['ingredient-property']}`}>
                    <span>Белки, г</span>
                    <span className='text text_type_digits-default'>{ingredient.proteins}</span>
                </div>
                <div className={`${styles['ingredient-property']}`}>
                    <span>Жиры, г</span>
                    <span className='text text_type_digits-default'>{ingredient.fat}</span>
                </div>
                <div className={`${styles['ingredient-property']}`}>
                    <span>Углеводы, г</span>
                    <span className='text text_type_digits-default'>{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
}