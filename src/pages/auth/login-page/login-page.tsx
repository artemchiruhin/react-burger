import React, {useCallback, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Page} from '../../../components/page/page';
import {
    authWasSuccessful,
    authWasUnSuccessful,
    makeAuthRequest
} from '../../../services/actions/auth';
import { useAuth } from '../../../utils/auth';
import {API_URL} from '../../../constants';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isLoading } = useSelector((store: any) => store.auth);
    const navigate = useNavigate();
    // @ts-ignore
    const { signIn } = useAuth();

    const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, [setPassword]);
    
    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(makeAuthRequest());
        signIn(`${API_URL}/auth/login`, {
            email,
            password
        }).then(() => {
            dispatch(authWasSuccessful());
            navigate('/');
        }).catch((error: any) => authWasUnSuccessful('При авторизации произошла ошибка'));
    }, [dispatch, email, navigate, password, signIn]);

    return (
        <Page>
            <form className='form' method='POST' onSubmit={onSubmit}>
                <span className='title text text_type_main-medium mb-6'>Вход</span>
                <EmailInput
                    placeholder={'E-mail'}
                    onChange={onChangeEmail}
                    value={email}
                    name={'email'}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={onChangePassword}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20" disabled={isLoading}>
                    Войти
                </Button>
                <p className="text text_type_main-default">
                    Вы новый пользователь? <Link to="/register" className="link">Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default">
                    Забыли пароль? <Link to="/forgot-password" className="link">Восстановить пароль</Link>
                </p>
            </form>
        </Page>
    );
}