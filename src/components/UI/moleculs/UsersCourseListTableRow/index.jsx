import React from 'react'
import cls from './UsersCourseListTableRow.module.scss'
import dayjs from 'dayjs'
import { EditMentorIcon } from '../../atoms/icons'

const UsersCourseListTableRow = ({
    key='',
    course='',
    teacher='',
    callMentor='',
    startDate='',
    endDate='',
    level='',
    index=''
}) => {
  return (
    <tr key={key} className={cls.UsersCourseListTableRow}>
        <td>{index + 1}</td>
        <td>{course ? course : "Kiritilmagan"}</td>
        <td>{teacher ? teacher : "Kiritilmagan"}</td>
        <td>{callMentor ? callMentor : "Kiritilmagan"}</td>
        <td>{startDate ? dayjs(startDate).format('DD.MM.YYYY') : "Kiritilmagan"}</td>
        <td>{endDate ? dayjs(endDate).format('DD.MM.YYYY') : "Kiritilmagan"}</td>
        <td>{level ? level : "Kiritilmagan"}</td>
        <td>
            <button className="edit-button">
                <EditMentorIcon />
            </button>
        </td>
    </tr>
  )
}

export default UsersCourseListTableRow