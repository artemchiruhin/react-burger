import React from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {

}

export const ModalOverlay = ({ children, ...props }: ModalOverlayProps) => {
    return (
        <div className={`${styles['overlay']}`} {...props}>
            { children }
        </div>
    );
}