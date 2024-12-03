import cls from './CoursesTableRow.module.scss';
import { formatDate } from '@/utils/formatDate';

const CoursesTableRow = ({
    index,
    course,
    startDate,
    endDate,
}) => {
       return (

        <tr className={cls.row}>

            <td>{index}</td>
            <td>{course}</td>
            <td>{formatDate(startDate)}</td>
            <td >{formatDate(endDate)}</td>
            <td className={cls.row__teachers}>

            </td>
        </tr>

    )
}

export default CoursesTableRow;