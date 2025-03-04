import { cn } from '@/utils/lib';
import cls from './RadioButton.module.scss';

const RadioButton = ({
    name = '',
    label = '',
    value = '',
    register = {},
    error,
    disabled,
    defaultChecked,
    className,
    radioClassName,
    onChange,
    preffix
}) => {
    return (
        <label className={className||cn(cls.label, error && cls.error)}>
            <span>{label}</span>
            <input 
                type="radio"
                name={name} 
                value={value} 
                disabled={disabled}
                className={radioClassName||cls.radio}
                defaultChecked={defaultChecked}
                onChange={onChange}
                {...register}
            />
            {preffix && <span>{preffix}</span>}
        </label>
    );
}

export default RadioButton;