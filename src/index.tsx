import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import './index.css';
import App from './App';
import './fonts/JetBrainsMono-Bold.ttf';
import './fonts/JetBrainsMono-Medium.ttf';
import './fonts/JetBrainsMono-Regular.ttf';
import './fonts/JetBrainsMono-SemiBold.ttf';
import {store} from './services/store';
import {ProvideAuth} from './utils/auth';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <ProvideAuth>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </ProvideAuth>
            </DndProvider>
        </Provider>
    </React.StrictMode>
);
