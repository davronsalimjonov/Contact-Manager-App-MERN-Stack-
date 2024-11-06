import { cn } from '@/utils/lib';
import cls from './MenuItem.module.scss';

const MenuItem = ({
    className = '',
    icon = <></>,
    label = '',
    isOpen = false,
    onClick
}) => {
    return (
        <div 
            className={cn(cls.item, className, !isOpen && cls.close)}
            onClick={onClick}
        >
            <div className={cls.item__icon}>{icon}</div>
            <span className={cls.item__label}>{label}</span>
        </div>
    );
}

export default MenuItem;