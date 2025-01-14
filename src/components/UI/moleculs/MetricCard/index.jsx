import PerformanceIndicator from '../../atoms/PerformanceIndicator'
import cls from "./MetricCard.module.scss"

const MetricCard = ({
  title = "",
  value = "",
  icon = <></>,
  iconBg = "",
  iconStyle = {},
  percentage = 0,
}) => {
  return (
    <div className={cls.card}>
        <div>
              <div>
                <h3 className={cls.card__title}>{title}</h3>
                <span className={cls.card__value}>{value}</span>
              </div>
              <div className={cls.card__icon} style={{ backgroundColor: iconBg, ...iconStyle }}>{icon}</div>
        </div>
        <PerformanceIndicator
            value={Math.abs(percentage)}
            positively={percentage >= 0}
            label='Bu oydagi natijalar'
        />
    </div>
  )
}

export default MetricCard