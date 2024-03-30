import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Page} from '../../../components/page/page';
import {
    forgotPasswordRequestWasSuccessful, forgotPasswordRequestWasUnSuccessful,
    makeForgotPasswordRequest,
} from '../../../services/actions/forgotPassword';
import {sendRecoveryPasswordLink} from '../../../utils/api';
import {API_URL} from '../../../constants';
import {checkResponse} from '../../../utils/checkResponse';

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { isLoading } = useSelector((store: any) => store.forgotPassword);
    const navigate = useNavigate();

    const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(makeForgotPasswordRequest());
        sendRecoveryPasswordLink(`${API_URL}/password-reset`, { email })
            .then(checkResponse)
            .then(() => {
                dispatch(forgotPasswordRequestWasSuccessful());
                localStorage.setItem('recoveryLinkWasSent', 'Y');
                navigate('/reset-password');
            })
            .catch(() => dispatch(forgotPasswordRequestWasUnSuccessful()));
    }, [dispatch, email, navigate]);

    useEffect(() => {
        if(localStorage.getItem('recoveryLinkWasSent') !== 'Y') {
            return;
        }
        navigate('/reset-password');
    });

    return (
        <Page>
            <form className='form' method='POST' onSubmit={onSubmit}>
                <span className='title text text_type_main-medium mb-6'>Восстановление пароля</span>
                <EmailInput
                    placeholder={'Укажите e-mail'}
                    onChange={onChangeEmail}
                    value={email}
                    name={'email'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20" disabled={isLoading}>
                    Восстановить
                </Button>
                <p className="text text_type_main-default">
                    Вспоминили пароль? <Link to="/register" className="link">Войти</Link>
                </p>
            </form>
        </Page>
    );
}