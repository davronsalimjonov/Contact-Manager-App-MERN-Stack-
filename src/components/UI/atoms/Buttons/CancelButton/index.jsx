import { cn } from '@/utils/lib';
import Button from '../Button';
import cls from './CancelButton.module.scss';

const CancelButton = ({
    className = '',
    disabled = false,
    isLoading = false,
    onClick
}) => {
    return (
        <Button
            className={cn(cls.btn, className)}
            disabled={disabled}
            isLoading={isLoading}
            onClick={onClick}
        >
            Bekor qilish
        </Button>
    );
}

export default CancelButton;