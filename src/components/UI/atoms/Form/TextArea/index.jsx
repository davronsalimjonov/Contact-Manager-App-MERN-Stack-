import { cn } from '@/utils/lib';
import cls from './TextArea.module.scss';

const TextArea = ({
    className = '',
    placeholder = '',
    value,
    disabled,
    readOnly,
    defaultValue,
    error = false,
    register = {},
    ...otherProps
}) => {
    return (
        <textarea
            className={cn(cls.textarea, error && cls.error, className)}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            {...register}
            {...otherProps}
        />
    );
}

export default TextArea;