import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

export const AppHeader = () => {
    return (
        <header className={`${styles['header']} pt-4 pb-4`}>
            <div className="container">
                <div className={`${styles['header__inner']}`}>
                    <nav className={`${styles['header__navigation']}`} aria-label="Основная">
                        <ul className={`${styles['header__navigation-list']}`}>
                            <li className={`${styles['header__navigation-item']}`}>
                                <a href="#" className={`${styles['header__navigation-link']} ${styles['header__navigation-link--active']} p-5`}>
                                    <BurgerIcon type="primary" />
                                    <span className={`${styles['header__navigation-link-text']} ml-2`}>Конструктор</span>
                                </a>
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
                                <a href="#" className={`${styles['header__navigation-link']} p-5`}>
                                    <ProfileIcon type="secondary" />
                                    <span className={`${styles['header__navigation-link-text']} ml-2`}>Личный кабинет</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}