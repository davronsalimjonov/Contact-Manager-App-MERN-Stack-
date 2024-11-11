import cls from './RadioButton.module.scss';

const RadioButton = ({
    name = ''
}) => {
    return (
        <label className={cls.label}>
            <span>Erkak</span>
            <input 
                className={cls.radio} 
                type="radio"
                name={name} 
            />
        </label>
    );
}

export default RadioButton;