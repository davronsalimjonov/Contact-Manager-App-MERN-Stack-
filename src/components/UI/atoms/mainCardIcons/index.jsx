import React from 'react'
import cls from './mainCardIcons.module.scss'

const MainCardIcons = ({ 
    icon = <></>,
    iconBg = ""
 }) => {
  return (
    <div className={cls.MainCardIcons} style={{ backgroundColor: iconBg }}>
        {icon}
    </div>
  )
}

export default MainCardIcons