import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Page} from '../../../components/page/page';
import {registerUser} from '../../../services/actions/register';
import {useAuth} from '../../../utils/auth';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isLoading } = useSelector((store: any) => store.register);
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const onChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, [setName]);

    const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        dispatch(registerUser({ email, name, password, signUp }));
        navigate('/');
    }, [dispatch, email, name, password, signUp, navigate]);

    return (
        <Page>
            <form className='form' method='POST' onSubmit={onSubmit}>
                <span className='text text_type_main-medium mb-6'>Регистрация</span>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChangeName}
                    value={name}
                    name={'name'}
                    size={'default'}
                    extraClass="mb-6"
                />
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
                    Зарегистрироваться
                </Button>
                <p className="text text_type_main-default">
                    Уже зарегистрированы? <Link to="/login" className="link">Войти</Link>
                </p>
            </form>
        </Page>
    );
}