import PerformanceIndicator from '../../atoms/PerformanceIndicator'
import cls from "./MetricCard.module.scss"

const MetricCard = ({
  title = "",
  value = "",
  icon = <></>,
  iconBg = "",
  iconStyle = {},
  additionalInformation,
  percentage = undefined,
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
        {!isNaN(percentage) && (
          <PerformanceIndicator
              value={Math.abs(percentage)}
              positively={percentage >= 0}
              label='Bu oydagi natijalar'
          />
        )}
        {additionalInformation}
    </div>
  )
}

export default MetricCard