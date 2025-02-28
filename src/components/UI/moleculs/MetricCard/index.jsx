import PerformanceIndicator from '../../atoms/PerformanceIndicator'
import cls from "./MetricCard.module.scss"

const MetricCard = ({
  title = "",
  value = "",
  icon = <></>,
  iconBg = "",
  iconStyle = {},
  additionalInformation,
  percentage,
  onClick
}) => {

  return (
    <div className={cls.card} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <div>
              <div>
                <h3 className={cls.card__title}>{title}</h3>
                <span className={cls.card__value}>{value}</span>
              </div>
              <div className={cls.card__icon} style={{ backgroundColor: iconBg, ...iconStyle }}>{icon}</div>
        </div>
        {Number.isInteger(percentage) && (
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