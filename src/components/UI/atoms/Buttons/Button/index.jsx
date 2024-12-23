import { cn } from '@/utils/lib';
import cls from './Button.module.scss';
import ButtonLoader from '../../ButtonLoader';

const Button = ({ 
    children,
    onClick,
    disabled,
    isLoading,
    className = '',
    type = 'button',
    rounded = false,
    ...otherProps
}) => {
    return (
        <button 
            type={type}
            className={cn(cls.btn, rounded && cls.rounded, className)}
            onClick={isLoading ? e => e.preventDefault() : onClick}
            disabled={disabled}
            {...otherProps}
        >
            {isLoading ? <ButtonLoader children={children} /> : children}
        </button>
    );
}

export default Button;