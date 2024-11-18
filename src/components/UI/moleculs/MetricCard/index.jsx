import PerformanceIndicator from '../../atoms/PerformanceIndicator'
import cls from "./MetricCard.module.scss"

const MetricCard = ({
  title = "",
  value = "",
  icon = <></>,
  iconBg = "",
  stat = <></>,
  percentage = 0,
  positively = true
}) => {
  return (
    <div className={cls.card}>
        <div>
            <div>
                <h3 className={cls.card__title}>{title}</h3>
                <span className={cls.card__value}>{value}</span>
              </div>
              <div className={cls.card__icon} style={{ backgroundColor: iconBg }}>{icon}</div>
        </div>
        <PerformanceIndicator
            value={percentage}
            positively={positively}
            label='Bu oydagi natijalar'
        />
    </div>
  )
}

export default MetricCard