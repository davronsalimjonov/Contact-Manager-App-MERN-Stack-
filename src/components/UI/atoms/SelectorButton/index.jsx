import { cn } from '@/utils/lib';
import cls from './SelectorButton.module.scss';

const SelectorButton = ({
    isActive = false,
    children,
    onClick
}) => {
    return (
        <button 
            type='button'
            className={cn(cls.btn, isActive && cls.active)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default SelectorButton;