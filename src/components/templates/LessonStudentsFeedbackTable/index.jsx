import Avatar from 'react-avatar';
import { StarIcon } from '@/components/UI/atoms/icons';
import cls from './LessonStudentsFeedbackTable.module.scss';
import EmptyData from '@/components/UI/organisms/EmptyData';

const LessonStudentsFeedbackTable = ({ items = [], onClick }) => {
    return items?.length > 0 ? (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Ism-familiya</th>
                    <th>Izoh</th>
                    <th>O’quvchilar baholari</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index) => {
                    const fullName = `${item?.studentfirstname} ${item?.studentlastname}`?.trim()
                    return (
                        <tr 
                            key={item?.studentid}
                            className={cls.row}
                            onClick={() => onClick?.(item)}
                        >
                            <td>{index + 1}</td>
                            <td className={cls.row__name}>
                                <Avatar src={item?.studenturl} name={fullName} size={24} round /> {fullName}
                            </td>
                            <td>{item?.comments?.join(', ')}</td>
                            <td className={cls.row__stars}><StarIcon begining={100} /> {item?.rate}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    ) : (
        <EmptyData />
    )
}

export default LessonStudentsFeedbackTable;