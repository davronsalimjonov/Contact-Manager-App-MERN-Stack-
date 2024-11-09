import React from 'react'
import cls from "./NotFoundText.module.scss"

const NotFoundText = () => {
  return (
    <h1 className={cls.NotFoundText}>
        Siz izlagan ma’lumot topilmadi! <br />
        Iltimos ma’lumotlarni tekshirib qaytadan kiriting
    </h1>
  )
}

export default NotFoundText