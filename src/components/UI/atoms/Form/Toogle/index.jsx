import cls from './Toogle.module.scss';

const Toogle = ({
    onChange,
    defaultChecked,
    disabled
}) => {
    return (
        <label className={cls.toogle}>
            <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} disabled={disabled} />
            <span className={cls.toogle__slider}></span>
        </label>
    );
}

export default Toogle;