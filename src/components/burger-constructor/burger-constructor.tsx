import React, {useMemo, useState} from 'react';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useNavigate} from 'react-router-dom';
import {useDrop} from 'react-dnd';
import {Modal} from '../modal/modal';
import {ModalOverlay} from '../modal-overlay/modal-overlay';
import {OrderDetails} from '../order-details/order-details';
import {IIngredient} from '../../interfaces/IIngredient';
import {addIngredient, chooseBun} from '../../services/actions/ingredients';
import {createOrder} from '../../services/actions/order';
import {AddedIngredient} from '../added-ingredient/added-ingredient';
import {useAuth} from '../../utils/auth';
import {useSelector, useDispatch} from '../../hooks/store';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const { addedIngredients, chosenBun } = useSelector((store) => store.ingredients);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const navigate = useNavigate();

    const onClickCreateOrder = () => {
        if(!user) {
            navigate('/login');
            return;
        }
        if(!chosenBun) {
            return;
        }
        setIsModalShown(true);
        dispatch(createOrder({ ingredients: [...addedIngredients.map(ingredient => ingredient._id), chosenBun._id] }));
    }

    const onCloseModal = () => {
        setIsModalShown(false);
    }

    const orderSum = useMemo(() => {
        let sum = addedIngredients.reduce((currentSum: number, currentItem: IIngredient) => currentSum + currentItem.price, 0);
        if(chosenBun) {
            sum += chosenBun.price * 2;
        }
        return sum;
    }, [addedIngredients, chosenBun]);

    const onDropIngredient = (ingredient: IIngredient) => {
        if(ingredient.type === 'bun') {
            dispatch(chooseBun(ingredient));
        } else {
            dispatch(addIngredient(ingredient));
        }
    }

    const [, drop] = useDrop(() => ({
        accept: 'addingIngredient',
        drop: onDropIngredient,
    }));

    return (
        <>
            { isModalShown &&
                <Modal onClose={onCloseModal}>
                    <ModalOverlay onClick={onCloseModal} />
                    <Modal.Content className='pl-10 pr-10 pt-30 pb-30'>
                        <Modal.CloseButton onClick={onCloseModal} />
                        <OrderDetails />
                    </Modal.Content>
                </Modal>
            }
            <div className="pt-25" ref={drop}>
                <div className={`${styles['elements']}`}>
                    { !!chosenBun &&
                        <div className={`${styles['element-wrapper']}`}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${chosenBun.name} (верх)`}
                                price={chosenBun.price}
                                thumbnail={chosenBun.image_mobile}
                                extraClass={`${styles['element']}`}
                            />
                        </div>
                    }
                    <div className={`${styles['unlocked-elements']}`}>
                        {
                            addedIngredients.map((ingredient, index) => <AddedIngredient ingredient={ingredient} index={index} key={ingredient.uniqueId} />)
                        }
                    </div>
                    { !!chosenBun &&
                        <div className={`${styles['element-wrapper']}`}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${chosenBun.name} (низ)`}
                                price={chosenBun.price}
                                thumbnail={chosenBun.image_mobile}
                                extraClass={`${styles['element']}`}
                            />
                        </div>
                    }
                </div>
                { !!orderSum &&
                    <div className={`${styles['total']} mt-10`}>
                        <div className={`${styles['total-sum']} mr-10`}>
                            <span className="text text_type_digits-medium">{orderSum}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button htmlType="button" type="primary" size="large" onClick={onClickCreateOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                }
            </div>
        </>
    );
}