import cls from './Toogle.module.scss';

const Toogle = ({
    onChange,
    defaultChecked
}) => {
    return (
        <label className={cls.toogle}>
            <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} />
            <span className={cls.toogle__slider}></span>
        </label>
    );
}

export default Toogle;