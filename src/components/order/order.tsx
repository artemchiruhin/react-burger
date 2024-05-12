import React, {useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from '../../hooks/store';
import {getGroupedIngredients} from '../../utils/getGroupedIngredients';
import styles from './order.module.css';
import {fetchOrder} from '../../services/actions/order';
import {ORDER_STATUSES} from '../../constants';

export const Order = () => {
    const { number } = useParams();
    const dispatch = useDispatch();
    const { loadedOrder, isOrderLoading } = useSelector(store => store.order);
    const { ingredients } = useSelector(store => store.ingredients);

    const sum = useMemo(() => {
        let calculatedSum = 0;
        loadedOrder?.ingredients.forEach((ingredientId: string) => {
            const foundIngredient = ingredients.find(ingredient => ingredient._id === ingredientId);
            calculatedSum += foundIngredient?.price || 0;
        })
        return calculatedSum;
    }, [ingredients, loadedOrder?.ingredients]);

    const groupedIngredients = getGroupedIngredients(ingredients, loadedOrder?.ingredients || []);

    useEffect(() => {
        if(!number) return;

        dispatch(fetchOrder(number));
    }, []);

    if(isOrderLoading) {
        return (
            <div>Загрузка...</div>
        );
    }

    if(!loadedOrder) {
        return (
            <div>Ошибка при загрузке заказа...</div>
        );
    }

    return (
        <div className={styles['wrapper']}>
            <div className={'number text text_type_digits-default mb-10'}>#{ loadedOrder.number }</div>
            <div className={'title text text_type_main-medium mb-3'}>{ loadedOrder.name }</div>
            <div className={'text text_type_main-small mb-15'}>{ ORDER_STATUSES[loadedOrder.status] }</div>
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
                { loadedOrder && <FormattedDate date={new Date(loadedOrder.createdAt)} className={'text text_type_main-default text_color_inactive'} /> }
                <div className={`${styles['sum']} text text_type_digits-default`}>
                    { sum }
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}