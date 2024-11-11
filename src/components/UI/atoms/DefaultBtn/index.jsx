import React from 'react'
import cls from "./DefaultBtn.module.scss"

const DefaultBtn = ({
    buttonTxt = "",
    bg = ""
}) => {
  return (
    <div className={cls.DefaultBtn} style={{ backgroundColor: bg }}>
        <button>{buttonTxt}</button>
    </div>
  )
}

export default DefaultBtn