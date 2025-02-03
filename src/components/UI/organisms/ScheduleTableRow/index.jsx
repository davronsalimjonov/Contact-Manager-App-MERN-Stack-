import cls from './ScheduleTableRow.module.scss';
import { SwitchComponent } from '../../atoms/Switch';

const ScheduleTableRow = ({
    idx = 1,
    fullName = "Davron Salimjonov",
    homework = "Lorem ipsum dolor sit amet consecetur birbalo sirbalo",
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
                <SwitchComponent />
            </td>
        </tr>
    );
}

export default ScheduleTableRow;