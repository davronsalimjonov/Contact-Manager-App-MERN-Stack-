import Toogle from '../../atoms/Form/Toogle';
import EmptyDataText from '../../atoms/EmptyDataText';
import cls from './LessonStudentsAttendanceTableRow.module.scss';

const LessonStudentsAttendanceTableRow = ({
    index = 1,
    fullName = "",
    hasHomeWork = false,
    attendance = false,
    onClick
}) => {

    return (
        <tr className={cls.row} onClick={onClick}>
            <td>{index}</td>
            <td>{fullName}</td>
            <td>
                {hasHomeWork ? (
                    <button className={cls.row__homework}>Topshirdi</button>
                ) : (
                    <EmptyDataText text='Vazifa topshirilmagan' />
                )}
            </td>
            <td><Toogle defaultChecked={attendance} disabled /></td>
        </tr>
    );
}

export default LessonStudentsAttendanceTableRow;