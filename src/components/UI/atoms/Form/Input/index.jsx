import { cn } from '@/utils/lib';
import { forwardRef } from 'react';
import cls from './Input.module.scss';

const Input = forwardRef(({
    type = 'text',
    className = '',
    placeholder = '',
    value,
    readOnly,
    disabled,
    onChange,
    defaultValue,
    register = {},
    error = '',
    preffix,
    suffix,
    ...otherProps
}, ref) => {
    return (
        <span className={cls.wrapper}>
            {suffix && <span className={cls.input__suffix}>{suffix}</span>}
            <input
                ref={ref}
                className={cn(cls.input, error && cls.error, className)}
                type={type}
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                {...otherProps}
                {...register}
            />
            {preffix && <span className={cls.input__preffix}>{preffix}</span>}
        </span>
    );
})

export default Input;