import React, {ReactNode} from 'react';
import {AppHeader} from '../app-header/app-header';

interface PageProps {
    children: ReactNode,
    containerClass?: string,
}
export const Page = ({ children, containerClass }: PageProps) => {
    return (
        <>
            <AppHeader/>
            <main className="main">
                <div className={`container pl-2 pr-2 ${containerClass}`}>
                    {children}
                </div>
            </main>
        </>
    );
}