import cls from './EmptyData.module.scss';

const EmptyData = ({
    image = '/images/no-result.svg',
    text = "Ma'lumotlar topilmadi"
}) => {
    return (
        <div className={cls.block}>
            <img src={image} alt="" />
            <span className={cls.block__text} dangerouslySetInnerHTML={{ __html: text }}></span>
        </div>
    );
}

export default EmptyData;