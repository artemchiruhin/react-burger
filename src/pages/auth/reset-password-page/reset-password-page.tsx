import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Button, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Page} from '../../../components/page/page';
import {resetPassword} from '../../../services/actions/resetPassword';

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const onChangeCode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }, [setCode]);

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(resetPassword({ password, code }) as any)
        navigate('/login');
    }, [code, dispatch, navigate, password]);

    useEffect(() => {
        if(localStorage.getItem('recoveryLinkWasSent')) {
            return;
        }
        navigate('/forgot-password');
    });

    return (
        <Page>
            <form className='form' method='POST' onSubmit={onSubmit}>
                <span className='title text text_type_main-medium mb-6'>Восстановление пароля</span>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={onChangePassword}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Input
                    placeholder={'Введите код из письма'}
                    value={code}
                    onChange={onChangeCode}
                    name={'code'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Сохранить
                </Button>
                <p className="text text_type_main-default">
                    Вспоминили пароль? <Link to="/register" className="link">Войти</Link>
                </p>
            </form>
        </Page>
    );
}