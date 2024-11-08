import React from 'react'
import MainMenuCard from '../../moleculs/MainMenuCard'
import { cardItems, pieChartData } from './data'
import cls from './Main.module.scss'
import PieChartCards from '../../moleculs/PieChartCards'
import LineChartCard from '../../moleculs/LineChartCard'

const Main = () => {
  return (
    <div className={cls.Main}>
        <div className={cls.MainCard}>
            {cardItems.map((item) => (
                <div key={`MainMenuCard-${item?.id}`}>
                    <MainMenuCard 
                        header={item?.header} 
                        count={item?.count} 
                        percentage={item?.percentage}
                        stat={item?.stat}
                        icon={item?.icon}
                        iconBg={item?.iconBg}
                    />
                </div>
            ))}
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

export default Main