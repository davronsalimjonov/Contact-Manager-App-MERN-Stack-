import { useRef } from 'react';
import ReactPhoneInput from 'react-phone-number-input'
import { cn } from '@/utils/lib';
import cls from './PhoneInput.module.scss'
import 'react-phone-number-input/style.css'

const PhoneInput = ({
    className = '',
    placeholder = '',
    onChange = () => { },
    error,
    ...props
}) => {
    const inputRef = useRef()

    const handlePhoneChange = (value) => {
        const cursorPosition = inputRef.current ? inputRef.current.selectionStart : 0;

        if (value?.length <= 2) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.selectionStart = cursorPosition;
                    inputRef.current.selectionEnd = cursorPosition;
                }
            }, 0);
        }

        onChange(value)
    };

    return (
        <ReactPhoneInput
            ref={inputRef}
            onChange={handlePhoneChange}
            className={cn(cls.input, error && cls.error, className)}
            placeholder={placeholder}
            limitMaxLength
            {...props}
        />
    );
}

export default PhoneInput;
