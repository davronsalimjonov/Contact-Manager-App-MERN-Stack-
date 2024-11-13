import cls from './EmptyDataText.module.scss';

const EmptyDataText = ({ text = "Ma'lumot yoq" }) => {
    return (
        <span className={cls.text}>{text}</span>
    );
}

export default EmptyDataText;