import { cn } from '@/utils/lib';
import Button from '../Button';
import cls from './WhiteButton.module.scss';

const WhiteButton = ({
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

export default WhiteButton;