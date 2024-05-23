import {userFeedReducer, initialState as reducerInitialState} from "../services/reducers/userFeedReducer";
import {WS_ORDERS_URL} from "../constants";
import {connectUserFeed, disconnectUserFeed, USER_FEED_GET_MESSAGE} from "../services/actions/userFeed";

describe('user feed reducer', () => {
    it('should return initial state', () => {
        expect(
            userFeedReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should connect to websocket', () => {
        expect(
            userFeedReducer(undefined, connectUserFeed(WS_ORDERS_URL))
        ).toEqual({
            ...reducerInitialState,
            wsConnected: true,
        });
    });

    it('should disconnect from websocket', () => {
        expect(
            userFeedReducer(undefined, disconnectUserFeed())
        ).toEqual({
            ...reducerInitialState,
            wsConnected: false,
        })
    });

    it('should get message', () => {
        const payload = '{"success":true,"orders":[{"_id":"664b3af597ede0001d06b70e","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0941","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный фалленианский био-марсианский бургер","createdAt":"2024-05-20T11:58:45.329Z","updatedAt":"2024-05-20T11:58:45.696Z","number":40387},{"_id":"664b315897ede0001d06b703","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-20T11:17:44.742Z","updatedAt":"2024-05-20T11:17:45.169Z","number":40386},{"_id":"664b314d97ede0001d06b702","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-20T11:17:33.075Z","updatedAt":"2024-05-20T11:17:33.441Z","number":40385},{"_id":"664b313d97ede0001d06b701","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-20T11:17:17.376Z","updatedAt":"2024-05-20T11:17:17.851Z","number":40384},{"_id":"664b2ef197ede0001d06b6fa","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-20T11:07:29.353Z","updatedAt":"2024-05-20T11:07:29.875Z","number":40383},{"_id":"664b2e5e97ede0001d06b6f9","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-20T11:05:02.344Z","updatedAt":"2024-05-20T11:05:02.754Z","number":40382},{"_id":"664b23da97ede0001d06b6eb","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-20T10:20:10.088Z","updatedAt":"2024-05-20T10:20:10.474Z","number":40381},{"_id":"664b1c7b97ede0001d06b6dc","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-20T09:48:43.581Z","updatedAt":"2024-05-20T09:48:43.963Z","number":40380},{"_id":"664b13ad97ede0001d06b6c9","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-20T09:11:09.482Z","updatedAt":"2024-05-20T09:11:09.866Z","number":40379},{"_id":"664ad7ee97ede0001d06b69c","ingredients":["643d69a5c3f7b9001cfa0942","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный spicy бургер","createdAt":"2024-05-20T04:56:14.472Z","updatedAt":"2024-05-20T04:56:14.839Z","number":40378},{"_id":"664ad7d297ede0001d06b69a","ingredients":["643d69a5c3f7b9001cfa0942","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный spicy бургер","createdAt":"2024-05-20T04:55:46.453Z","updatedAt":"2024-05-20T04:55:46.813Z","number":40377},{"_id":"664ad78497ede0001d06b698","ingredients":["643d69a5c3f7b9001cfa0942","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный spicy бургер","createdAt":"2024-05-20T04:54:28.982Z","updatedAt":"2024-05-20T04:54:29.369Z","number":40376},{"_id":"664a755097ede0001d06b63c","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный люминесцентный бургер","createdAt":"2024-05-19T21:55:28.702Z","updatedAt":"2024-05-19T21:55:29.051Z","number":40375},{"_id":"664a714c97ede0001d06b633","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T21:38:20.107Z","updatedAt":"2024-05-19T21:38:20.461Z","number":40374},{"_id":"664a6de997ede0001d06b62e","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa0940","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный люминесцентный метеоритный бургер","createdAt":"2024-05-19T21:23:53.079Z","updatedAt":"2024-05-19T21:23:53.414Z","number":40373},{"_id":"664a5e6497ede0001d06b613","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный люминесцентный бургер","createdAt":"2024-05-19T20:17:40.877Z","updatedAt":"2024-05-19T20:17:41.215Z","number":40372},{"_id":"664a5bff97ede0001d06b60e","ingredients":["643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный бургер","createdAt":"2024-05-19T20:07:27.324Z","updatedAt":"2024-05-19T20:07:27.693Z","number":40371},{"_id":"664a5be097ede0001d06b60d","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T20:06:56.616Z","updatedAt":"2024-05-19T20:06:56.979Z","number":40370},{"_id":"664a5af697ede0001d06b60b","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный space люминесцентный бургер","createdAt":"2024-05-19T20:03:02.922Z","updatedAt":"2024-05-19T20:03:03.304Z","number":40369},{"_id":"664a595797ede0001d06b608","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0949","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Экзо-плантаго краторный space бургер","createdAt":"2024-05-19T19:56:07.943Z","updatedAt":"2024-05-19T19:56:08.484Z","number":40368},{"_id":"664a595797ede0001d06b607","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T19:56:07.461Z","updatedAt":"2024-05-19T19:56:07.879Z","number":40367},{"_id":"664a592a97ede0001d06b606","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa0949","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Экзо-плантаго space флюоресцентный бургер","createdAt":"2024-05-19T19:55:22.421Z","updatedAt":"2024-05-19T19:55:22.803Z","number":40366},{"_id":"664a591697ede0001d06b605","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T19:55:02.958Z","updatedAt":"2024-05-19T19:55:03.368Z","number":40365},{"_id":"664a58cf97ede0001d06b603","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T19:53:51.839Z","updatedAt":"2024-05-19T19:53:52.338Z","number":40364},{"_id":"664a589f97ede0001d06b601","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T19:53:03.992Z","updatedAt":"2024-05-19T19:53:04.393Z","number":40363},{"_id":"664a563097ede0001d06b5f9","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T19:42:40.906Z","updatedAt":"2024-05-19T19:42:41.296Z","number":40362},{"_id":"664a554697ede0001d06b5f8","ingredients":["643d69a5c3f7b9001cfa0949","643d69a5c3f7b9001cfa0946","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Экзо-плантаго флюоресцентный минеральный бургер","createdAt":"2024-05-19T19:38:46.323Z","updatedAt":"2024-05-19T19:38:46.704Z","number":40361},{"_id":"664a550697ede0001d06b5f7","ingredients":["643d69a5c3f7b9001cfa0946","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный минеральный бургер","createdAt":"2024-05-19T19:37:42.251Z","updatedAt":"2024-05-19T19:37:42.712Z","number":40360},{"_id":"664a54b797ede0001d06b5f6","ingredients":["643d69a5c3f7b9001cfa0942","643d69a5c3f7b9001cfa094a","643d69a5c3f7b9001cfa0949","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Астероидный экзо-плантаго флюоресцентный spicy бургер","createdAt":"2024-05-19T19:36:23.628Z","updatedAt":"2024-05-19T19:36:23.996Z","number":40359},{"_id":"664a547997ede0001d06b5f5","ingredients":["643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный фалленианский бургер","createdAt":"2024-05-19T19:35:21.504Z","updatedAt":"2024-05-19T19:35:21.875Z","number":40358},{"_id":"664a541197ede0001d06b5ed","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный люминесцентный бургер","createdAt":"2024-05-19T19:33:37.121Z","updatedAt":"2024-05-19T19:33:37.506Z","number":40357},{"_id":"664a52f397ede0001d06b5e7","ingredients":["643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный бургер","createdAt":"2024-05-19T19:28:51.162Z","updatedAt":"2024-05-19T19:28:51.516Z","number":40356},{"_id":"664a52d297ede0001d06b5e4","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa0940","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный люминесцентный метеоритный бургер","createdAt":"2024-05-19T19:28:18.507Z","updatedAt":"2024-05-19T19:28:18.920Z","number":40355},{"_id":"664a51ca97ede0001d06b5e1","ingredients":["643d69a5c3f7b9001cfa0940","643d69a5c3f7b9001cfa0949","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный экзо-плантаго метеоритный бургер","createdAt":"2024-05-19T19:23:54.708Z","updatedAt":"2024-05-19T19:23:55.182Z","number":40354},{"_id":"664a505797ede0001d06b5df","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный space бургер","createdAt":"2024-05-19T19:17:43.887Z","updatedAt":"2024-05-19T19:17:44.255Z","number":40353},{"_id":"664a504297ede0001d06b5de","ingredients":["643d69a5c3f7b9001cfa093f","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Флюоресцентный фалленианский бессмертный бургер","createdAt":"2024-05-19T19:17:22.224Z","updatedAt":"2024-05-19T19:17:22.600Z","number":40352},{"_id":"664a4cff97ede0001d06b5d0","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa0941","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный люминесцентный био-марсианский бургер","createdAt":"2024-05-19T19:03:27.753Z","updatedAt":"2024-05-19T19:03:28.208Z","number":40351},{"_id":"664a4c6697ede0001d06b5ce","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0942","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный space spicy бургер","createdAt":"2024-05-19T19:00:54.584Z","updatedAt":"2024-05-19T19:00:54.962Z","number":40350},{"_id":"664a39b497ede0001d06b5ab","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:41:08.967Z","updatedAt":"2024-05-19T17:41:09.312Z","number":40349},{"_id":"664a395c97ede0001d06b5a9","ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093e","643d69a5c3f7b9001cfa093c"],"status":"done","name":"Краторный люминесцентный бургер","createdAt":"2024-05-19T17:39:40.633Z","updatedAt":"2024-05-19T17:39:40.991Z","number":40348},{"_id":"664a380c97ede0001d06b5a2","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:34:04.277Z","updatedAt":"2024-05-19T17:34:04.647Z","number":40347},{"_id":"664a37e797ede0001d06b5a0","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:33:27.324Z","updatedAt":"2024-05-19T17:33:27.707Z","number":40346},{"_id":"664a37b897ede0001d06b59f","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:32:40.959Z","updatedAt":"2024-05-19T17:32:41.364Z","number":40345},{"_id":"664a37a597ede0001d06b59e","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:32:21.941Z","updatedAt":"2024-05-19T17:32:22.370Z","number":40344},{"_id":"664a378f97ede0001d06b59d","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:31:59.045Z","updatedAt":"2024-05-19T17:31:59.414Z","number":40343},{"_id":"664a377897ede0001d06b59a","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:31:36.896Z","updatedAt":"2024-05-19T17:31:37.271Z","number":40342},{"_id":"664a376497ede0001d06b599","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:31:16.203Z","updatedAt":"2024-05-19T17:31:16.557Z","number":40341},{"_id":"664a374797ede0001d06b598","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:30:47.508Z","updatedAt":"2024-05-19T17:30:47.877Z","number":40340},{"_id":"664a372997ede0001d06b597","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:30:17.070Z","updatedAt":"2024-05-19T17:30:17.468Z","number":40339},{"_id":"664a371197ede0001d06b596","ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный бургер","createdAt":"2024-05-19T17:29:53.833Z","updatedAt":"2024-05-19T17:29:54.248Z","number":40338}],"total":40013,"totalToday":72}';
        const data = JSON.parse(payload);

        expect(
            userFeedReducer(undefined, { type: USER_FEED_GET_MESSAGE, payload })
        ).toEqual({
            ...reducerInitialState,
            orders: data.orders,
        });
    });
});