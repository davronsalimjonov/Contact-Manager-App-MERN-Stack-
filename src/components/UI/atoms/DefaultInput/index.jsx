import React from 'react'
import cls from './DefaultInput.module.scss'

const DefaultInput = ({
    label = "",
    type = "",
    defaultVal = "",
    disabled = ""
}) => {
  return (
    <div className={cls.DefaultInput}>
        <label htmlFor="">{label}</label>
        <input type={type} defaultValue={defaultVal} />
    </div>
  )
}

export default DefaultInput