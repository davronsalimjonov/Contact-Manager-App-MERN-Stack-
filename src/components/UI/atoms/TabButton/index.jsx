import { cn } from '@/utils/lib';
import cls from './TabButton.module.scss';

const TabButton = ({ 
    isActive = false,
    children,
    onClick 
}) => {
    return (
        <button 
            className={cn(cls.tab, isActive && cls.active)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default TabButton;