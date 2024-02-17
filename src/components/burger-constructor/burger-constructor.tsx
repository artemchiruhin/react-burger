import React from 'react';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {IIngredient} from '../../interfaces/IIngredient';
import styles from './burger-constructor.module.css';

interface BurgerConstructorProps {
    ingredients: IIngredient[],
}

export const BurgerConstructor = ({ ingredients }: BurgerConstructorProps) => {
    return (
        <div className="custom-scroll pt-25">
            <div className={`${styles['elements']}`}>
                {/* todo заменить на реальные данные при разработке */}
                <div className={`${styles['element-wrapper']}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                        extraClass={`${styles['element']}`}
                    />
                </div>
                <div className={`${styles['unlocked-elements']}`}>
                    {
                        ingredients.map(ingredient => (
                            <div className={`${styles['element-wrapper']}`}>
                                <div className={`${styles['element-drag']}`}>
                                    <DragIcon type="primary" />
                                </div>
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image_mobile}
                                    extraClass={`${styles['element']}`}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className={`${styles['element-wrapper']}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                        extraClass={`${styles['element']}`}
                    />
                </div>
            </div>
            <div className={`${styles['total']} mt-10`}>
                <div className={`${styles['total-sum']} mr-10`}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}