import LineChart from '../../atoms/LineChart'
import cls from "./LineChartCard.module.scss"

const LineChartCard = () => {
  return (
    <div className={cls.LineChartCard}>
        <div>
            <LineChart />
        </div>
    </div>
  )
}

export default LineChartCard