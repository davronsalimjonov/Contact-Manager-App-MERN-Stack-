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
}) => {
    return (
        <label className={cn(cls.label, error && cls.error)}>
            <span>{label}</span>
            <input 
                type="radio"
                name={name} 
                value={value} 
                disabled={disabled}
                className={cls.radio}
                defaultChecked={defaultChecked}
                {...register}
            />
        </label>
    );
}

export default RadioButton;