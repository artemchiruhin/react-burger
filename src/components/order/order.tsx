import React, {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from '../../hooks/store';
import {getGroupedIngredients} from '../../utils/getGroupedIngredients';
import styles from './order.module.css';

export const Order = () => {
    const { number } = useParams();
    const { orders } = useSelector(store => store.feed);
    const foundOrder = orders.find(item => item.number === Number(number));
    const { ingredients } = useSelector(store => store.ingredients);

    const sum = useMemo(() => {
        let calculatedSum = 0;
        foundOrder?.ingredients.forEach((ingredientId: string) => {
            const foundIngredient = ingredients.find(ingredient => ingredient._id === ingredientId);
            calculatedSum += foundIngredient?.price || 0;
        })
        return calculatedSum;
    }, [ingredients, foundOrder?.ingredients]);

    const groupedIngredients = getGroupedIngredients(ingredients, foundOrder?.ingredients || []);

    if(!foundOrder) {
        return null;
    }
    return (
        <div className={'wrapper'}>
            <div className={'number text text_type_digits-default mb-10'}>#{ foundOrder.number }</div>
            <div className={'title text text_type_main-medium mb-3'}>{ foundOrder.name }</div>
            <div className={'text text_type_main-small mb-15'}>{ foundOrder.status }</div>
            <div className={'ingredients mb-10'}>
                <div className={'text text_type_main-medium mb-6'}>Состав:</div>
                <div className={`${styles['ingredients-list']}`}>
                    {
                        groupedIngredients.map(ingredient => {
                            return (
                                <div className={`${styles['ingredient']} mb-4`}>
                                    <div className={`${styles['ingredient-image-wrapper']}`}>
                                        <img src={ingredient.ingredient?.image_mobile} className={`${styles['ingredient-image']}`} alt={ingredient.ingredient?.name}/>
                                    </div>
                                    <div className={'text text_type_main-default'}>{ ingredient.ingredient?.name }</div>
                                    <div className={`${styles['ingredient-sum']} text text_type_digits-default`}>
                                        { ingredient.count } x { ingredient.ingredient?.price }
                                        <CurrencyIcon type={'primary'} />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className={`${styles['bottom']}`}>
                <FormattedDate date={new Date(foundOrder.createdAt)} className={'text text_type_main-default text_color_inactive'} />
                <div className={`${styles['sum']} text text_type_digits-default`}>
                    { sum }
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}