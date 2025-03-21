import { forwardRef } from 'react';
import MaskedInput from 'react-input-mask';
import { cn } from '@/utils/lib';
import cls from './MaskInput.module.scss';

const MaskInput = forwardRef(({
    className = '',
    mask = '',
    error,
    onChange,
    placeholder = '',
    formatChars,
    maskChar = '_',
    ...otherProps
}, ref) => {
    return (
        <MaskedInput
            mask={mask}
            placeholder={placeholder}
            onChange={onChange}
            formatChars={formatChars}
            maskChar={maskChar}
            className={cn(cls.input, className, error && cls.error)}
            {...otherProps}
            inputRef={ref}
        />
    );
})

export default MaskInput;