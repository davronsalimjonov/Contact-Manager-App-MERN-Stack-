import cls from './EmptyTableCellText.module.scss';

const EmptyTableCellText = ({ text = "Ma'lumot yoq" }) => {
    return (
        <span className={cls.text}>{text}</span>
    );
}

export default EmptyTableCellText;