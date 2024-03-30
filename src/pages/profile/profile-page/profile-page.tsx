import React, {useCallback} from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {Page} from '../../../components/page/page';
import styles from './profile-page.module.css';
import clsx from 'clsx';
import {useAuth} from '../../../utils/auth';
import {logoutRequest} from '../../../utils/api';
import {API_URL} from '../../../constants';
import {checkResponse} from '../../../utils/checkResponse';

export const ProfilePage = () => {
    // @ts-ignore
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const onLogout = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        signOut().then(() => {
            navigate('/login');
        })
    }, [navigate, signOut]);

    return (
        <Page>
            <div className={`${styles['wrapper']}`}>
                <div className="menu">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <NavLink to={'/profile'} replace className={({ isActive }) => {
                                return clsx(styles['menu-link'], 'text text_type_main-medium', { [styles['active']]: isActive });
                            }}>
                                Профиль
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to={'/profile/orders'} replace className={({ isActive }) => {
                                return clsx(styles['menu-link'], 'text text_type_main-medium', { [styles['active']]: isActive });
                            }}>
                                История заказов
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <a href="#" className={`${styles['menu-link']} text text_type_main-medium`} onClick={onLogout}>Выход</a>
                        </li>
                    </ul>
                    <div className={`${styles['menu-text']} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <Outlet />
            </div>
        </Page>
    );
}