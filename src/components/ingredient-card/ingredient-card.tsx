import React, {useState} from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import {IIngredient} from '../../interfaces/IIngredient';
import {createPortal} from 'react-dom';
import {ModalOverlay} from '../modal-overlay/modal-overlay';
import {Modal} from '../modal/modal';
import {IngredientDetails} from '../ingredient-details/ingredient-details';

interface IngredientCardProps extends React.HTMLAttributes<HTMLDivElement> {
    ingredient: IIngredient,
}

export const IngredientCard = ({ ingredient, ...props }: IngredientCardProps) => {
    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    const onClickIngredient = () => {
        setIsModalShown(true);
    }

    const onCloseModal = () => {
        setIsModalShown(false);
    }

    return (
        <>
            { isModalShown && createPortal(
                <Modal onClose={onCloseModal}>
                    <ModalOverlay onClick={onCloseModal} />
                    <Modal.Content className='pl-10 pr-10 pt-10 pb-15'>
                        <Modal.Title className='text text_type_main-large'>Детали ингредиента</Modal.Title>
                        <Modal.CloseButton onClick={onCloseModal} />
                        <IngredientDetails ingredient={ingredient} />
                    </Modal.Content>
                </Modal>,
                document.body
                )
            }
            <div className={`${styles['wrapper']}`} {...props} onClick={onClickIngredient}>
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
        </>
    );
}