import { cn } from '@/utils/lib';
import cls from './Button.module.scss';

const Button = ({ 
    children,
    className = '' 
}) => {
    return (
        <button className={cn(cls.btn, className)}>
            {children}
        </button>
    );
}

export default Button;