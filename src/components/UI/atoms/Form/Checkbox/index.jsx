import cls from './Checkbox.module.scss';

const Checkbox = ({
    label = '',
    defaultChecked,
    register = {}
}) => {
    return (
        <label className={cls.label}>
            <input type="checkbox" {...register} defaultChecked={defaultChecked} />
            <span>{label}</span>
        </label>
    );
}

export default Checkbox;