import React from 'react'
import cls from './mainCardHeader.module.scss'

const MainCardHeader = ({ 
    header = "",
    count = ""
 }) => {
  return (
    <div className={cls.MainCardHeader}>
        <p>{header}</p>
        <h1>{count} <span></span></h1>
    </div>
  )
}

export default MainCardHeader