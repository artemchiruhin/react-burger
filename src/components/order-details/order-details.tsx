import React from 'react';
import doneImage from '../../images/done.png';
import styles from './order-details.module.css';
import {useSelector} from 'react-redux';

export const OrderDetails = () => {
    const { isLoading, order } = useSelector((store: any) => store.order);

    if(isLoading) {
        return (
            <div className={`${styles['wrapper']}`}>
                <div className="text text_type_main-medium">Загрузка</div>
            </div>
        );
    }

    return (
        <div className={`${styles['wrapper']}`}>
            <div className={`${styles['order-number']} text text_type_digits-large`}>{order.number}</div>
            <div className="text text_type_main-medium mt-8">идентификатор заказа</div>
            <div className={`${styles['image-wrapper']} mt-15 mb-15`}>
                <img src={doneImage} className={`${styles['image']}`} alt="Заказ оформлен"/>
            </div>
            <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
            <div className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</div>
        </div>
    );
}