import React, {useEffect} from 'react';
import {FeedItem} from '../feed-item/feed-item';
import {useDispatch, useSelector} from '../../hooks/store';
import {connect} from '../../services/actions/wsActions';
import {WS_ORDERS_URL} from '../../constants';

export const UserFeed = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(store => store.userFeed);

    useEffect(() => {
        const [_, token] = (localStorage.getItem('accessToken') || '').split(' ');
        dispatch(connect(`${WS_ORDERS_URL}?token=${token}`));
    }, []);

    return (
        <div>
            {
                orders.map(order => (
                    <FeedItem order={order} key={order.number} />
                ))
            }
        </div>
    );
}