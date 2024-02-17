import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import {IIngredient} from '../../interfaces/IIngredient';

interface IngredientCardProps {
    ingredient: IIngredient,
}

export const IngredientCard = ({ ingredient }: IngredientCardProps) => {
    return (
        <div className={`${styles['wrapper']}`}>
            <div className={`${styles['image-wrapper']} pl-4 pr-4 mb-1`}>
                <img src={ingredient.image} className="image" alt="Ингредиент"/>
            </div>
            <div className={`${styles['price']} mb-1`}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles['name']} text text_type_main-default`}>{ingredient.name}</div>
            <span className={`${styles['count']}`}>1</span>
        </div>
    );
}