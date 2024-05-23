export const API_URL = 'https://norma.nomoreparties.space/api';

export const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const ORDER_STATUSES: Record<string, string> = {
    done: 'Выполнен',
    created: 'Создан',
    pending: 'Выполняется'
}