import { useState } from 'react';
import { cn } from '@/utils/lib';
import Input from '@/components/UI/atoms/Form/Input';
import { CloseEyesIcon, OpenEyesIcon, PasswordLockIcon } from '@/components/UI/atoms/icons';
import FormElementWrapper from '../FormElementWrapper';
import cls from './FormPasswordInput.module.scss';

const FormPasswordInput = ({
    className = '',
    placeholder = '',
    type = '',
    label = '',
    error = '',
    defaultValue,
    register = {},
    ...otherProps
}) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [isShow, setIsShow] = useState(false)

    return (
        <FormElementWrapper label={label} error={error}>
            <div className={`${cls.input__wrapper} ${className}`}>
                <div className={cls.input__wrapper__icon}>
                    <PasswordLockIcon />
                </div>
                <Input
                    className={cn(error && cls.inputError)}
                    type={isShow ? 'text' : 'password'}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    register={register}
                    {...otherProps}
                />
                <button
                    type='button'
                    className={cls.input__eyeBtn}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsShow(state => !state)}
                >
                    {isShow ? <OpenEyesIcon /> : <CloseEyesIcon />}
                </button>
            </div>
        </FormElementWrapper>
    );
}

export default FormPasswordInput;