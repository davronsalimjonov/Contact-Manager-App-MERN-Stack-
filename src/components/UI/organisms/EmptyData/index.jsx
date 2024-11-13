import cls from './EmptyData.module.scss';

const EmptyData = ({
    image = '/images/no-result.svg',
    text = "Sizda hozirda hech qanday jadval mavjud emas Qo’shish tugmasi orqali o’zingiz uchun dars jadvali tuzib olsangiz bo’ladi."
}) => {
    return (
        <div className={cls.block}>
            <img src={image} alt="" />
            <span className={cls.block__text}>{text}</span>
        </div>
    );
}

export default EmptyData;