import React from 'react';
import {NavLink} from 'react-router-dom';
import {clsx} from 'clsx';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';
import {useAuth} from '../../utils/auth';

export const AppHeader = () => {
    // @ts-ignore
    const { user } = useAuth();

    return (
        <header className={`${styles['header']} pt-4 pb-4`}>
            <div className="container">
                <div className={`${styles['header__inner']}`}>
                    <nav className={`${styles['header__navigation']}`} aria-label="Основная">
                        <ul className={`${styles['header__navigation-list']}`}>
                            <li className={`${styles['header__navigation-item']}`}>
                                <NavLink to={'/'} className={({ isActive }) => {
                                    return clsx(styles['header__navigation-link'], 'p-5', {
                                        [styles['header__navigation-link--active']]: isActive,
                                    });
                                }}>
                                    {({ isActive }) => (
                                        <>
                                            <BurgerIcon type={isActive ? "primary" : "secondary"}/>
                                            <span className="ml-2">Конструктор</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li className={`${styles['header__navigation-item']}`}>
                                <a href="#" className={`${styles['header__navigation-link']} p-5`}>
                                    <ListIcon type="secondary" />
                                    <span className={`${styles['header__navigation-link-text']} ml-2`}>Лента заказов</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <Logo />
                    <nav className={`${styles['header__navigation']} ${styles['header__navigation--additional']}`} aria-label="Дополнительная">
                        <ul className={`${styles['header__navigation-list']}`}>
                            <li className={`${styles['header__navigation-item']}`}>
                                <NavLink to={'/profile'} className={({ isActive }) => {
                                    return clsx(styles['header__navigation-link'], 'p-5', {
                                        [styles['header__navigation-link--active']]: isActive,
                                    });
                                }}>
                                    {({ isActive }) => (
                                        <>
                                            <ProfileIcon type={isActive ? "primary" : "secondary"} />
                                            <span className={`${styles['header__navigation-link-text']} ml-2`}>{ user?.name || 'Личный кабинет' }</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}