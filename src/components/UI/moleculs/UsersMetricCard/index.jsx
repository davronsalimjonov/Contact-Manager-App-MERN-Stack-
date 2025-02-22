import cls from "./UsersMetricCard.module.scss"

const UsersMetricCard = ({
    count = 0,
    free = null,
    pro = null,
    color = "",
    title = ""
}) => {
    return (
        <div className={cls.card}>
            <span className={cls.card__count} style={{ color }}>{count}</span>
            <div className={cls.card__info}>
            <span className={cls.card__title}>{title}</span>
            {(free !== null || pro !== null) ? (
                <div className={cls.card__details}>
                    {free !== null && <span>Free: <span>{free || 0}</span></span>}
                    {pro !== null && <span>Pro: <span>{pro || 0}</span></span>}
                </div>
            ) : null}
            </div>
        </div>
    )
}

export default UsersMetricCard