import { MetricCashIcon, MetricPersonsIcon, MetricStarsIcon, MetricTimeIcon, StarIcon } from '@/components/UI/atoms/icons'
import MetricCard from '../../UI/moleculs/MetricCard'
import PieChartCards from '../../UI/moleculs/PieChartCards'
import LineChartCard from '../../UI/moleculs/LineChartCard'
import { pieChartData } from './data'
import cls from './Dashboard.module.scss'
import useGetStatistic from '@/hooks/useGetStatistic'

const Dashboard = () => {
    useGetStatistic({})
    return (
        <div className={cls.main}>
            <div className={cls.mainCard}>
                <MetricCard
                    title='Qo’ng’iroqlar soni'
                    value={'15 ta'}
                    percentage={8.5}
                    icon={<MetricTimeIcon />}
                    iconBg='rgba(0, 182, 155, 0.21)'
                />
                <MetricCard
                    title='Reytinggi'
                    value={<><StarIcon /> 5</>}
                    percentage={8.5}
                    icon={<MetricStarsIcon />}
                    iconBg='rgba(160, 188, 241, 0.3)'
                />
                <MetricCard
                    title='Qo’ng’iroq davomiyligi'
                    value={'10:22 s'}
                    percentage={8.5}
                    icon={<MetricCashIcon />}
                    iconBg='rgba(254, 197, 61, 0.2)'
                />
                <MetricCard
                    title='Task bajarish tezligi'
                    value={'01:24 s'}
                    percentage={8.5}
                    icon={<MetricPersonsIcon />}
                    iconBg='rgba(255, 0, 0, 0.21)'
                />
            </div>
            <div className={cls.pieChartCards}>
                {pieChartData.map((item) => (
                    <div className={cls.pieChartCard} key={`pieChartCard-${item?.id}`}>
                        <PieChartCards
                            id={item?.id}
                            title={item?.title}
                            labels={item?.labels}
                            values={item?.values}
                            colors={item?.chartColors}
                            background={item?.background}
                            borders={item?.borders}
                        />
                    </div>
                ))}
            </div>
            <div>
                <LineChartCard />
            </div>
        </div>
    )
}

export default Dashboard