import { cn } from '@/utils/lib';
import cls from './ErrorLabel.module.scss';

const ErrorLabel = ({
    children,
    className,
}) => {
    return (
        <span className={cn(cls.error, className)}>
            {children}
        </span>
    );
}

export default ErrorLabel;