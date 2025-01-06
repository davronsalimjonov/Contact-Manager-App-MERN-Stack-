import cls from './MentorsPageCard.module.scss';


const MentorsPageCard = ({
    bgColor = "#fff",
    title = "",
    text = ""
}) => {

    return (
    <div className={cls.card} style={{ backgroundColor: bgColor }}>
        <p className={cls.card__title}>{title}</p>
        <p className={cls.card__text}>{text}</p>
    </div>)
}

export default MentorsPageCard;