import cls from './MentorsAvarageCard.module.scss';

const MentorsAvarageCard = ({
    backgroundColor = "rgba(66, 120, 226, 1)",
    title = "",
    value = ""
}) => {
    return (
        <div className={cls.card} style={{ backgroundColor }}>
            <span className={cls.card__title}>{title}</span>
            <span className={cls.card__text}>{value}</span>
        </div>
    )
}

export default MentorsAvarageCard;