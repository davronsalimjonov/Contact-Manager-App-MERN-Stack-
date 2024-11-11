import { cn } from '@/utils/lib';
import Button from '../Button';
import cls from './RedButton.module.scss';

const RedButton = ({
    children,
    onClick,
    className,
    disabled,
    type,
}) => {
    return (
        <Button
            type={type}
            className={cn(cls.btn, className)} 
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}

export default RedButton;