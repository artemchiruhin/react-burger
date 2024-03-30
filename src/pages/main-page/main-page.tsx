import React from 'react';
import {useSelector} from 'react-redux';
import {Page} from '../../components/page/page';
import {BurgerIngredients} from '../../components/burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../../components/burger-constructor/burger-constructor';

export const MainPage = () => {
    const loading = useSelector((store: any) => store.ingredients.isLoading);
    
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