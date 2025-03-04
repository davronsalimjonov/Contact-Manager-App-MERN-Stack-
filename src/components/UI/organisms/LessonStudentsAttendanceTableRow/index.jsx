import Toogle from '../../atoms/Form/Toogle';
import EmptyDataText from '../../atoms/EmptyDataText';
import cls from './LessonStudentsAttendanceTableRow.module.scss';
import { StarIcon } from '../../atoms/icons';

const LessonStudentsAttendanceTableRow = ({
    index = 1,
    fullName = "",
    hasHomeWork = false,
    attendance = false,
    mark = 0,
    onClickHomeWork
}) => {

    return (
        <tr className={cls.row}>
            <td>{index}</td>
            <td>{fullName}</td>
            <td>
                {hasHomeWork ? (
                    <button className={cls.row__homework} onClick={onClickHomeWork}>Topshirdi</button>
                ) : (
                    <EmptyDataText text='Vazifa topshirilmagan' />
                )}
            </td>
            <td className={cls.row__star}><StarIcon begining={mark*20} /> {mark}</td>
            <td><Toogle defaultChecked={attendance} disabled /></td>
        </tr>
    );
}

export default LessonStudentsAttendanceTableRow;