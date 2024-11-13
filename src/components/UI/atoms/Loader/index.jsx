import cls from './Loader.module.scss';

const Loader = ({ size }) => {
    return (
        <div className={cls.loader}>
            <div style={{ width: size }}></div>
        </div>
    );
}

export default Loader;