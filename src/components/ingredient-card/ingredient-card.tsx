import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';
import {Link, useLocation} from 'react-router-dom';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IIngredient} from '../../interfaces/IIngredient';
import styles from './ingredient-card.module.css';

interface IngredientCardProps extends React.HTMLAttributes<HTMLDivElement> {
    ingredient: IIngredient,
}

export const IngredientCard = ({ ingredient, ...props }: IngredientCardProps) => {
    const { addedIngredients, chosenBun }: {addedIngredients: IIngredient[], chosenBun: IIngredient} = useSelector((store: any) => store.ingredients);
    const location = useLocation();

    const count = useMemo(() => {
        if(ingredient.type === 'bun' && ingredient._id === chosenBun?._id) return 1;
        return addedIngredients.filter(item => item._id === ingredient._id).length;
    }, [addedIngredients, chosenBun, ingredient._id, ingredient.type]);

    const [, drag] = useDrag(() => ({
        type: 'addingIngredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }));

    return (
        <Link
            key={ingredient._id}
            to={`/ingredients/${ingredient._id}`}
            state={{ background: location }}
            className={`${styles['link']}`}
        >
            <div className={`${styles['wrapper']}`} {...props} ref={drag}>
                <div className={`${styles['image-wrapper']} pl-4 pr-4 mb-1`}>
                    <img src={ingredient.image} className="image" alt="Ингредиент"/>
                </div>
                <div className={`${styles['price']} mb-1`}>
                    <span className="text text_type_digits-default">{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${styles['name']} text text_type_main-default`}>{ingredient.name}</div>
                { !!count && <span className={`${styles['count']}`}>{count}</span> }
            </div>
        </Link>
    );
}