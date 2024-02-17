import React, {useEffect, useRef} from 'react';
import {IIngredient} from '../../interfaces/IIngredient';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientCard} from '../ingredient-card/ingredient-card';
import styles from './burger-ingredients.module.css';
import {IIngredientBlock} from '../../interfaces/IIngredientBlock';

interface BurgerIngredientsProps {
    ingredients: IIngredient[]
}

export const BurgerIngredients = ({ ingredients }: BurgerIngredientsProps) => {
    const [currentBlock, setCurrentBlock] = React.useState('main');
    const ingredientsBlocks: IIngredientBlock[] = [
        {
            title: 'Булки',
            type: 'bun',
            ingredients: ingredients.filter(ingredient => ingredient.type === 'bun'),
            ref: useRef<HTMLDivElement>(null),
        },
        {
            title: 'Соусы',
            type: 'sauce',
            ingredients: ingredients.filter(ingredient => ingredient.type === 'sauce'),
            ref: useRef<HTMLDivElement>(null),
        },
        {
            title: 'Начинки',
            type: 'main',
            ingredients: ingredients.filter(ingredient => ingredient.type === 'main'),
            ref: useRef<HTMLDivElement>(null),
        },
    ];

    useEffect(() => {
        const block = ingredientsBlocks.find(item => item.type === currentBlock);
        if(!block) return;

        block.ref.current.scrollIntoView({
            behavior: 'smooth',
        });
    }, [currentBlock]);

    return (
        <section>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className="ingredients">
                <div style={{ display: 'flex' }} className="mb-10">
                    {
                        ingredientsBlocks.map(block => (
                            <Tab key={block.type} value={block.type} active={currentBlock === block.type} onClick={setCurrentBlock}>
                                {block.title}
                            </Tab>
                        ))
                    }
                </div>
                <div className={`${styles['ingredients__list']} custom-scroll pl-4 pr-4`}>
                    {
                        ingredientsBlocks.map(block => {
                            return (
                                <div key={block.type} ref={block.ref} className="ingredients__block mb-10">
                                    <h2 className="ingredients__block-title text text_type_main-medium mb-6">{block.title}</h2>
                                    <div className={`${styles['ingredients__items']}`}>
                                        {
                                            block.ingredients.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} />)
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}