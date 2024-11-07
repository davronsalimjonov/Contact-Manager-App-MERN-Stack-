import cls from './Button.module.scss';

const Button = ({ children }) => {
    return (
        <button className={cls.btn}>
            {children}
        </button>
    );
}

export default Button;