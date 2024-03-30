import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-data-form.module.css';
import {editDataWasSuccessful, editDataWasUnSuccessful, makeEditDataRequest} from '../../services/actions/user';
import {editUserDataRequest} from '../../utils/api';
import {API_URL} from '../../constants';
import {useAuth} from '../../utils/auth';

export const UserDataForm = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { user, setUser } = useAuth();

    const [name, setName] = useState<string>(user?.name || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [password, setPassword] = useState<string>('');

    const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(makeEditDataRequest());
        const newUserData = { name, email };
        if(password) {
            // @ts-ignore
            newUserData.password = password;
        }
        editUserDataRequest(`${API_URL}/auth/user`, newUserData)
            .then(() => {
                dispatch(editDataWasSuccessful());
                setUser({
                    ...user,
                    name,
                })
            })
            .catch((error) => dispatch(editDataWasUnSuccessful(error)));
    }, [dispatch, email, name, password, setUser, user]);

    useEffect(() => {
        setEmail(user?.email || '');
        setName(user?.name || '');
    }, [user]);

    return (
        <form className={`${styles['form']}`} onSubmit={onSubmit}>
            <Input
                type="text"
                placeholder="Имя"
                onChange={e => setName(e.target.value)}
                icon="EditIcon"
                value={name}
                name="name"
                size="default"
                extraClass="mb-6"
            />
            <EmailInput
                onChange={e => setEmail(e.target.value)}
                value={email}
                name="email"
                placeholder="Логин"
                isIcon={true}
                extraClass="mb-6"
                disabled={false}
            />
            <PasswordInput
                onChange={e => setPassword(e.target.value)}
                value={password}
                name="password"
                icon="EditIcon"
                extraClass="mb-6"
                disabled={false}
            />
            <div className={`${styles['buttons']}`}>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </form>
    );
}