import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {ForgotPasswordPage, LoginPage, MainPage, RegisterPage, ResetPasswordPage, IngredientPage, ProfilePage, FeedPage, OrderPage} from './pages';
import {ModalOverlay} from './components/modal-overlay/modal-overlay';
import {Modal} from './components/modal/modal';
import {IngredientDetails} from './components/ingredient-details/ingredient-details';
import {loadIngredients} from './services/actions/ingredients';
import {ProtectedRouteElement} from './components/protected-route/protected-route';
import {OnlyUnauthorizedRoute} from './components/only-unauthorized-route/only-unauthorized-route';
import {UserDataForm} from './components/user-data-form/user-data-form';
import {useDispatch} from './hooks/store';
import {Order} from './components/order/order';
import {UserFeed} from './components/user-feed/user-feed';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location?.state?.background;

    const onCloseModal = () => {
        navigate(-1);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);

    return (
        <>
            <Routes location={background || location}>
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/login'} element={<OnlyUnauthorizedRoute element={<LoginPage />} redirectTo={'/'} />} />
                <Route path={'/register'} element={<OnlyUnauthorizedRoute element={<RegisterPage />} redirectTo={'/'} />} />
                <Route path={'/forgot-password'} element={<OnlyUnauthorizedRoute element={<ForgotPasswordPage />} redirectTo={'/'} />} />
                <Route path={'/reset-password'} element={<OnlyUnauthorizedRoute element={<ResetPasswordPage />} redirectTo={'/'} />} />
                <Route path={'/profile'} element={<ProtectedRouteElement element={<ProfilePage />} />}>
                    <Route path={''} element={<UserDataForm />} />
                    <Route path={'orders'} element={<UserFeed />} />
                    <Route path={'orders/:number'} element={<Order />} />
                </Route>
                <Route path={'/ingredients/:id'} element={<IngredientPage />} />
                <Route path={'/feed'} element={<FeedPage />} />
                <Route path={'/feed/:number'} element={<OrderPage />} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:id'
                        element={
                            <Modal onClose={onCloseModal}>
                                <ModalOverlay onClick={onCloseModal} />
                                <Modal.Content className='pl-10 pr-10 pt-10 pb-15'>
                                    <Modal.Title className='text text_type_main-large'>Детали ингредиента</Modal.Title>
                                    <Modal.CloseButton onClick={onCloseModal} />
                                    <IngredientDetails />
                                </Modal.Content>
                            </Modal>
                        }
                    />
                    <Route
                        path='/feed/:number'
                        element={
                            <Modal onClose={onCloseModal}>
                                <ModalOverlay onClick={onCloseModal} />
                                <Modal.Content className='pl-10 pr-10 pt-10 pb-15'>
                                    <Modal.CloseButton onClick={onCloseModal} />
                                    <Order />
                                </Modal.Content>
                            </Modal>
                        }
                    />
                    <Route
                        path='/profile/orders/:number'
                        element={
                            <Modal onClose={onCloseModal}>
                                <ModalOverlay onClick={onCloseModal} />
                                <Modal.Content className='pl-10 pr-10 pt-10 pb-15'>
                                    <Modal.CloseButton onClick={onCloseModal} />
                                    <Order />
                                </Modal.Content>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
