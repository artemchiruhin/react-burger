import React, {useMemo} from 'react';
import {Link, LinkProps, useLocation} from 'react-router-dom';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {IOrder} from '../../interfaces/IOrder';
import {useSelector} from '../../hooks/store';
import styles from './feed-item.module.css';
import {getGroupedIngredients} from '../../utils/getGroupedIngredients';
import clsx from 'clsx';

type IFeedItemProps = {
    order: IOrder,
} & Pick<LinkProps, 'to'>

export const FeedItem = ({ order, to }: IFeedItemProps) => {
    const { ingredients } = useSelector(store => store.ingredients);
    const location = useLocation();

    const sum = useMemo(() => {
        let calculatedSum = 0;
        order.ingredients.forEach((ingredientId: string) => {
            const foundIngredient = ingredients.find(ingredient => ingredient._id === ingredientId);
            calculatedSum += foundIngredient?.price || 0;
        })
        return calculatedSum;
    }, [ingredients, order.ingredients]);

    const groupedIngredients = getGroupedIngredients(ingredients, order.ingredients);

    return (
        <Link
            to={to}
            state={{ background: location }}
            className={`${styles['feed-item']} p-6 mb-4`}
        >
            <div className={`${styles['top']}`}>
                <div className="number text text_type_digits-default">#{ order.number }</div>
                <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive" />
            </div>
            <div className="title text text_type_main-medium">{ order.name }</div>
            <div className={`${styles['bottom']}`}>
                <div className={`${styles['ingredients']}`}>
                    {
                        groupedIngredients.map((ingredient, index) => {
                            return (
                                <div className={clsx(styles['ingredient'], {
                                    [styles['more']]: ingredient.count > 1,
                                })} data-count-more={`+${ingredient.count - 1}`}
                                     key={ingredient.ingredient?._id || index}
                                >
                                    <img src={ingredient.ingredient?.image_mobile} className={`${styles['ingredient-image']}`} alt={ingredient.ingredient?.name} />
                                </div>
                            );
                        })
                    }
                </div>
                <div className={`${styles['sum']} text text_type_digits-default`}>
                    { sum }
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    );
}