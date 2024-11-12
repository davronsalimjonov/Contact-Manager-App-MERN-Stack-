import { cn } from '@/utils/lib';
import cls from './Button.module.scss';
import ButtonLoader from '../../ButtonLoader';

const Button = ({ 
    children,
    className = '',
    onClick,
    disabled,
    type = 'button',
    isLoading,
    ...otherProps
}) => {
    return (
        <button 
            type={type}
            className={cn(cls.btn, className)}
            onClick={isLoading ? e => e.preventDefault() : onClick}
            disabled={disabled}
            {...otherProps}
        >
            {isLoading ? <ButtonLoader children={children} /> : children}
        </button>
    );
}

export default Button;