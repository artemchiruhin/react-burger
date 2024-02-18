import React from 'react';
import './App.css';
import {AppHeader} from './components/app-header/app-header';
import {BurgerIngredients} from './components/burger-ingredients/burger-ingredients';
import {BurgerConstructor} from './components/burger-constructor/burger-constructor';
import data from './utils/data';

function App() {
    return (
        <>
            <AppHeader/>
            <main className="main">
                <div className="container main-container">
                    <BurgerIngredients ingredients={data} />
                    <BurgerConstructor ingredients={[data[0]]} />
                </div>
            </main>
        </>
    );
}

export default App;
