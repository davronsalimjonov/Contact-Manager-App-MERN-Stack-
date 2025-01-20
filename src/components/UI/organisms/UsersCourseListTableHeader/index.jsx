import React from 'react'
import cls from './UserCourseListTableHeader.module.scss'

const UsersCourseListTableHeader = () => {
  return (
    <thead className={cls.UsersCourseListTableHeader}>
        <tr>
        <th>N°</th>
        <th>Kurs nomi</th>
        <th>Asosiy mentor</th>
        <th>Nazoratchi mentor</th>
        <th>Sotib olgan sana</th>
        <th>Tugash sanasi</th>
        <th>Darajasi</th>
        <th></th>
        </tr>
    </thead>
  )
}

export default UsersCourseListTableHeader