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
                    <BurgerConstructor ingredients={[{
                        "_id":"60666c42cc7b410027a1a9ba",
                        "name":"Соус с шипами Антарианского плоскоходца",
                        "type":"sauce",
                        "proteins":101,
                        "fat":99,
                        "carbohydrates":100,
                        "calories":100,
                        "price":88,
                        "image":"https://code.s3.yandex.net/react/code/sauce-01.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png",
                        "__v":0
                    }]} />
                </div>
            </main>
        </>
    );
}

export default App;
