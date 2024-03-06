import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {AppHeader} from './components/app-header/app-header';
import {BurgerIngredients} from './components/burger-ingredients/burger-ingredients';
import {BurgerConstructor} from './components/burger-constructor/burger-constructor';
import {loadIngredients} from './services/actions/ingredients';

function App() {
    const dispatch = useDispatch();
    const loading = useSelector((store: any) => store.isLoading);

    useEffect(() => {
        // @ts-ignore
        dispatch(loadIngredients());
    }, []);

    return (
        <>
            <AppHeader/>
            <main className="main">
                <div className="container main-container pl-2 pr-2">
                    {
                        loading
                            ? <div>Загрузка...</div>
                            : <>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </>
                    }
                </div>
            </main>
        </>
    );
}

export default App;
