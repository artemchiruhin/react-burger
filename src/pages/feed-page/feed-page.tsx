import React, {useEffect, useMemo} from 'react';
import {Page} from '../../components/page/page';
import {useDispatch, useSelector} from '../../hooks/store';
import {WS_FEED_URL} from '../../constants';
import {FeedItem} from '../../components/feed-item/feed-item';
import {connectFeed, disconnectFeed} from '../../services/actions/feed';
import styles from './feed-page.module.css';

export const FeedPage = () => {
    const dispatch = useDispatch();
    const { totalToday, total, orders } = useSelector(store => store.feed);

    useEffect(() => {
        dispatch(connectFeed(WS_FEED_URL));

        return () => {
            dispatch(disconnectFeed());
        }
    }, [dispatch]);

    const ordersStatuses = useMemo(() => {
        const readyOrdersNumbers: number[] = orders.filter(order => order.status === 'done').slice(0, 30).map(order => order.number);
        const notReadyOrdersNumbers: number[] = orders.filter(order => order.status !== 'done').slice(0, 30).map(order => order.number);

        return {
            ready: readyOrdersNumbers,
            notReady: notReadyOrdersNumbers,
        }
    }, [orders]);
    return (
        <Page>
            <div className={`${styles['feed-wrapper']}`}>
                <div className={`${styles['feed-title']} text text_type_main-large mb-5`}>Лента заказов</div>
                <div className={`${styles['feed']}`}>
                    {
                        orders.map(order => (
                            <FeedItem order={order} key={order.number} to={`/feed/${order.number}`} />
                        ))
                    }
                </div>
                <div>
                    <div className={`${styles['products-numbers']} mb-15`}>
                        <div>
                            <div className='text text_type_main-medium mb-6'>Готовы</div>
                            <div className={`${styles['orders-numbers-list']}`}>
                                {
                                    ordersStatuses.ready.map(readyOrder => (
                                        <div className={`${styles['product-ready-number']} text text_type_digits-default`} key={readyOrder}>{ readyOrder }</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <div className='text text_type_main-medium mb-6'>В работе</div>
                            <div className={`${styles['orders-numbers-list']}`}>
                                {
                                    ordersStatuses.notReady.map(notReadyOrder => (
                                        <div className='text text_type_digits-default' key={notReadyOrder}>{ notReadyOrder }</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mb-15'>
                        <div className='text text_type_main-medium'>Выполнено за все время</div>
                        <div className='text text_type_digits-large'>{ total }</div>
                    </div>
                    <div>
                        <div className='text text_type_main-medium'>Выполнено за сегодня</div>
                        <div className='text text_type_digits-large'>{ totalToday }</div>
                    </div>
                </div>
            </div>
        </Page>
    );
}