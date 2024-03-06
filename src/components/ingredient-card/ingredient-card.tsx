import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IIngredient} from '../../interfaces/IIngredient';
import {ModalOverlay} from '../modal-overlay/modal-overlay';
import {Modal} from '../modal/modal';
import {IngredientDetails} from '../ingredient-details/ingredient-details';
import {showIngredient} from '../../services/actions/ingredients';
import styles from './ingredient-card.module.css';
import {useDrag} from 'react-dnd';

interface IngredientCardProps extends React.HTMLAttributes<HTMLDivElement> {
    ingredient: IIngredient,
}

export const IngredientCard = ({ ingredient, onClick, ...props }: IngredientCardProps) => {
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const { addedIngredients, chosenBun }: {addedIngredients: IIngredient[], chosenBun: IIngredient} = useSelector((store: any) => store.ingredients);
    const dispatch = useDispatch();

    const count = useMemo(() => {
        if(ingredient.type === 'bun' && ingredient._id === chosenBun?._id) return 1;
        return addedIngredients.filter(item => item._id === ingredient._id).length;
    }, [JSON.stringify(addedIngredients), JSON.stringify(chosenBun)]);

    const [, drag] = useDrag(() => ({
        type: 'addingIngredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }));

    const onClickIngredient = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsModalShown(true);
        dispatch(showIngredient(ingredient));
        onClick && onClick(event);
    }

    const onCloseModal = () => {
        setIsModalShown(false);
        dispatch(showIngredient(null));
    }

    return (
        <>
            { isModalShown &&
                <Modal onClose={onCloseModal}>
                    <ModalOverlay onClick={onCloseModal} />
                    <Modal.Content className='pl-10 pr-10 pt-10 pb-15'>
                        <Modal.Title className='text text_type_main-large'>Детали ингредиента</Modal.Title>
                        <Modal.CloseButton onClick={onCloseModal} />
                        <IngredientDetails />
                    </Modal.Content>
                </Modal>
            }
            <div className={`${styles['wrapper']}`} {...props} onClick={onClickIngredient} ref={drag}>
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
        </>
    );
}