import { cn } from '@/utils/lib';
import cls from './TabButton.module.scss';

const TabButton = ({ 
    className,
    activeClassName,
    children,
    onClick,
    isActive = false,
}) => {
    return (
        <button 
            type='button'
            className={cn(cls.tab, (isActive && (activeClassName || cls.active)), className)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default TabButton;