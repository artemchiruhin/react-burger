import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientCard} from '../ingredient-card/ingredient-card';
import {IIngredientBlock} from '../../interfaces/IIngredientBlock';
import {IIngredient} from '../../interfaces/IIngredient';
import {addIngredient, chooseBun} from '../../services/actions/ingredients';
import {useSelector, useDispatch} from '../../hooks/store';
import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
    const [currentBlock, setCurrentBlock] = useState('main');
    const observer = useRef<IntersectionObserver | null>(null);
    const { ingredients }: {ingredients: IIngredient[]} = useSelector((store) => store.ingredients);
    const dispatch = useDispatch();

    const onAddIngredient = useCallback((ingredient: IIngredient) => {
        if(ingredient.type === 'bun') {
            dispatch(chooseBun(ingredient));
        } else {
            dispatch(addIngredient(ingredient));
        }
    }, [dispatch]);

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
        observer.current = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
            if (visibleSection) {
                setCurrentBlock(visibleSection.id);
            }
        }, { threshold: 1 });

        const sections = document.querySelectorAll('[data-section]');

        sections.forEach((section) => {
            observer.current?.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.current?.unobserve(section);
            });
        };
    }, []);

    return (
        <section>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className="ingredients">
                <div className={`${styles['ingredients__tabs']} mb-10`}>
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
                                <div key={block.type}
                                     ref={block.ref}
                                     className="ingredients__block mb-10" id={block.type}
                                     data-section=""
                                >
                                    <h2 className="ingredients__block-title text text_type_main-medium mb-6">{block.title}</h2>
                                    <div className={`${styles['ingredients__items']}`}>
                                        {
                                            block.ingredients.map(ingredient => <IngredientCard key={ingredient._id} ingredient={ingredient} onClick={() => onAddIngredient(ingredient)} />)
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