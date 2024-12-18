import { useState } from 'react';
import { cn } from '@/utils/lib';
import { LeftArrowIcon } from '../../atoms/icons';
import cls from './ChatSidebarAccordion.module.scss';

const ChatSidebarAccordion = ({ 
    children,
    name = '',
    count = ''
}) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className={cls.accordion}>
            <div className={cls.accordion__header} onClick={() => setIsOpen(state => !state)}>
                <span className={cls.accordion__header__name}>{name}</span>
                <div className={cls.accordion__header__icon}>{count} <LeftArrowIcon style={{transform: `rotate(${isOpen ? '-90deg' : '90deg'})`}} /></div>
            </div>
            <div className={cn(cls.accordion__body, isOpen ? cls.open : cls.close)}>
                {children}
            </div>
        </div>
    );
}

export default ChatSidebarAccordion;