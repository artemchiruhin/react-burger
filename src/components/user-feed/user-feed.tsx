import React, {useEffect} from 'react';
import {FeedItem} from '../feed-item/feed-item';
import {useDispatch, useSelector} from '../../hooks/store';
import {WS_ORDERS_URL} from '../../constants';
import {connectUserFeed, disconnectUserFeed} from '../../services/actions/userFeed';

export const UserFeed = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(store => store.userFeed);

    useEffect(() => {
        const [, token] = (localStorage.getItem('accessToken') || '').split(' ');
        dispatch(connectUserFeed(`${WS_ORDERS_URL}?token=${token}`));

        return () => {
            dispatch(disconnectUserFeed());
        }
    }, [dispatch]);

    return (
        <div>
            {
                orders.map(order => (
                    <FeedItem order={order} key={order.number} to={`/profile/orders/${order.number}`} />
                ))
            }
        </div>
    );
}