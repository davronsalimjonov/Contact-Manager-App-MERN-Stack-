import cls from "./MentorMetricCard.module.scss"

const MentorMetricCard = ({
    count = 0,
    free = 0,
    pro = 0,
    countColor = "",
    title = ""
}) => {
  return (
    <div className={cls.MentorMetricCard}>
        <div>
            <h3 style={{ color: countColor }}>{count}</h3>
        </div>
        <div>
            <div><h2>{title}</h2></div>
            <div>
                <h3>Free: <span>{free}</span></h3>
                <h3>Pro: <span>{pro}</span></h3>
            </div>
        </div>
    </div>
  )
}

export default MentorMetricCard