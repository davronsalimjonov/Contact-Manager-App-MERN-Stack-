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
    isSpaced=false,
    ...otherProps
}) => {
    return (
        <button 
            type={type}
            className={cn(cls.btn, rounded && cls.rounded, className)}
            onClick={isLoading ? e => e.preventDefault() : onClick}
            disabled={disabled}
            style={isSpaced ? {"justifyContent": "space-between"} :  {"justifyContent": "center"}}
            {...otherProps}
        >
            {isLoading ? <ButtonLoader children={children} /> : children}
        </button>
    );
}

export default Button;