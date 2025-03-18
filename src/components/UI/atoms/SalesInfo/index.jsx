import React from 'react'
import cls from "./SalesInfo.module.scss"
import { SalesmanIcon } from '../icons'

const SalesInfo = ({
    fullName
}) => {
  return (
    <div className={cls.SalesInfo}>
        <SalesmanIcon />
        <h2>{fullName}</h2>
    </div>
  )
}

export default SalesInfo