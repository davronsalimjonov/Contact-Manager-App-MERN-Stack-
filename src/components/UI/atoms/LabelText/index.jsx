import { cn } from '@/utils/lib';
import cls from './LabelText.module.scss';

const LabelText = ({
    className,
    children
}) => {
    return (
        <span className={cn(cls.text, className)}>{children}</span>
    );
}

export default LabelText;