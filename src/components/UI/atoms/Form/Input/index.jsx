import { cn } from '@/utils/lib';
import { forwardRef } from 'react';
import cls from './Input.module.scss';

const Input = forwardRef(({
    type = 'text',
    className = '',
    placeholder = '',
    value,
    onChange,
    defaultValue,
    register = {},
    ...otherProps
}, ref) => {
    return (
        <input
            ref={ref}
            className={cn(cls.input, className)}
            type={type}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            {...otherProps}
            {...register}
        />
    );
})

export default Input;