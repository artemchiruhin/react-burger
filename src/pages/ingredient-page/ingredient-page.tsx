import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Page} from '../../components/page/page';
import {showIngredient} from '../../services/actions/ingredients';
import {IIngredient} from '../../interfaces/IIngredient';
import {useSelector, useDispatch} from '../../hooks/store';
import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
    const { id } = useParams();
    const { currentShowingIngredient: ingredient, ingredients } = useSelector((store) => store.ingredients);
    const dispatch = useDispatch();

    useEffect(() => {
        const foundIngredient = ingredients.find((item: IIngredient) => item._id === id);
        dispatch(showIngredient(foundIngredient));
    }, [dispatch, id, ingredients]);

    if(!ingredient) {
        return (
            <Page>
                <div className={`${styles['page-wrapper']}}`}>
                    <div className="text text_type_main-large">Ингредиент не найден</div>
                </div>
            </Page>
        );
    }

    return (
        <Page>
            <div className={`${styles['page-wrapper']}`}>
                <div className="text text_type_main-large">Детали ингредиента</div>
                <div className={`${styles['image-wrapper']}`}>
                    <img src={ingredient.image_large} className={`${styles['image']}`} alt={ingredient.name}/>
                </div>
                <span className="text text_type_main-medium mb-8">{ingredient.name}</span>
                <div className={`${styles['properties']}`}>
                    <div className={`${styles['property']}`}>
                        <span>Калории,ккал</span>
                        <span className="text text_type_digits-default">{ingredient.calories}</span>
                    </div>
                    <div className={`${styles['property']}`}>
                        <span>Белки, г</span>
                        <span className="text text_type_digits-default">{ingredient.proteins}</span>
                    </div>
                    <div className={`${styles['property']}`}>
                        <span>Жиры, г</span>
                        <span className="text text_type_digits-default">{ingredient.fat}</span>
                    </div>
                    <div className={`${styles['property']}`}>
                        <span>Углеводы, г</span>
                        <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
                    </div>
                </div>
            </div>
        </Page>
    );
}