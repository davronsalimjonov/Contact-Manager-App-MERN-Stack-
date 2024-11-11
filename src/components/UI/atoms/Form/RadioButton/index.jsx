import cls from './RadioButton.module.scss';

const RadioButton = ({
    name = '',
    label = '',
    value = '',
    register = {},
    disabled,
    defaultChecked,
}) => {
    return (
        <label className={cls.label}>
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