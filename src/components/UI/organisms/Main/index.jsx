import React from 'react'
import MainMenuCard from '../../moleculs/MainMenuCard'
import { cardItems } from './data'
import cls from './Main.module.scss'

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
    </div>
  )
}

export default Main