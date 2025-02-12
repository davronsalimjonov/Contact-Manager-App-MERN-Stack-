import cls from './ScheduleTableRow.module.scss';
import { SwitchComponent } from '../../atoms/Switch';

const ScheduleTableRow = ({
    idx = 1,
    fullName = "Kiritilmagan",
    homework = "Kiritilmagan",
    attendance = "",
    onClick
}) => {

    return (
        <tr className={cls.row} onClick={onClick}>
            <td>{idx}</td>
            <td>{fullName}</td>
            <td>
                <span className={cls.homeworkCell}>{homework}</span>
            </td>
            <td>
                <SwitchComponent
                    checked={attendance}
                />
            </td>
        </tr>
    );
}

export default ScheduleTableRow;