import React, {useEffect} from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import {createPortal} from 'react-dom';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose?: () => void,
}

export const Modal = ({ children, className, onClose, ...props }: ModalProps) => {
    useEffect(() => {
        const closeModal = (event: { key: string }) => {
            if(event.key !== 'Escape') return;
            onClose && onClose();
        }
        document.addEventListener('keydown', closeModal);

        return () => document.removeEventListener('keydown', closeModal);
    }, []);

    return createPortal(
        <div className={`${styles['modal']} ${className}`} {...props}>
            { children }
        </div>,
        document.body
    );
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {

}

Modal.Content = ({ children, className, ...props }: ModalContentProps) => {
    return (
        <div className={`${styles['modal-content']} ${className}`} {...props}>
            { children }
        </div>
    );
}

interface ModalTitleProps extends React.HTMLAttributes<HTMLDivElement> {

}

Modal.Title = ({ children, ...props }: ModalTitleProps) => {
    return (
        <div {...props}>
            { children }
        </div>
    );
}

interface ModalCloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {

}

Modal.CloseButton = ({ ...props }: ModalCloseButtonProps) => {
    return (
        <button className={`${styles['close']}`} {...props}>
            <CloseIcon type="primary" />
        </button>
    );
}