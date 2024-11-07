import React from 'react'
import MainCardHeader from '../../atoms/mainCardHeader'
import MainCardIcons from '../../atoms/mainCardIcons'
import MainCardStats from '../../atoms/mainCardStats'
import cls from "./MainMenuCard.module.scss"

const MainMenuCard = ({
    header = "",
    count = "",
    icon = <></>,
    iconBg="",
    stat = <></>,
    percentage = ""
}) => {
  return (
    <div className={cls.MainMenuCard}>
        <div>
            <MainCardHeader header={header} count={count} />
            <MainCardIcons icon={icon} iconBg={iconBg} />
        </div>
        <div>
            <MainCardStats percentage={percentage} stat={stat} />
        </div>
    </div>
  )
}

export default MainMenuCard