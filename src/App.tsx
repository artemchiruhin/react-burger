import React, {useEffect, useState} from 'react';
import './App.css';
import {AppHeader} from './components/app-header/app-header';
import {BurgerIngredients} from './components/burger-ingredients/burger-ingredients';
import {BurgerConstructor} from './components/burger-constructor/burger-constructor';
import {IIngredient} from './interfaces/IIngredient';
import {API_URL} from './constants';

function App() {
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setIngredients(data.data);
            } catch (e) {
                console.error('При запросе произошла ошибка', e);
            }
        }

        void getIngredients();
    }, []);

    return (
        <>
            <AppHeader/>
            <main className="main">
                <div className="container main-container">
                    <BurgerIngredients ingredients={ingredients} />
                    <BurgerConstructor ingredients={ingredients} />
                </div>
            </main>
        </>
    );
}

export default App;
