import PieChart from '../../atoms/PieChart'
import PieChartHeader from '../../atoms/PieChartHeader'
import PieChartLegend from '../../atoms/PieChartLegend'
import cls from './PieChartCards.module.scss'

const PieChartCards = ({
    id = 0,
    title = "",
    labels = [],
    values = [],
    colors = [],
    background = [],
    borders = []
}) => {
  return (
    <div className={cls.PieChartCards}>
        <div>
            <PieChartHeader title={title} />
        </div>
        <div className={id === 0 ? cls.column : cls.row}>
            <div>
                <PieChart labels={labels} values={values} colors={colors} id={id} />
            </div>
            <div>
                <PieChartLegend labels={labels} values={values} colors={colors} id={id} background={background} borders={borders} />
            </div>
        </div>
    </div>
  )
}

export default PieChartCards