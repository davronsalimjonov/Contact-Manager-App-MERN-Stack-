import { cn } from '@/utils/lib';
import cls from './Button.module.scss';

const Button = ({ 
    children,
    className = '',
    onClick,
    disabled,
    type = 'button',
    ...otherProps
}) => {
    return (
        <button 
            type={type}
            className={cn(cls.btn, className)}
            onClick={onClick}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
}

export default Button;