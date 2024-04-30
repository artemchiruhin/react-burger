import React from 'react';
import {Page} from '../../components/page/page';
import {BurgerIngredients} from '../../components/burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../../components/burger-constructor/burger-constructor';
import {useSelector} from '../../hooks/store';

export const MainPage = () => {
    const loading = useSelector((store) => store.ingredients.isLoading);
    
    return (
        <Page containerClass="main-container">
            { loading
                ? <div>Загрузка...</div>
                : <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </>
            }
        </Page>
    );
}