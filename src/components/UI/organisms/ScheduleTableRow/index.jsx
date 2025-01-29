import { useNavigate } from 'react-router-dom';
import cls from './ScheduleTableRow.module.scss';
import { SwitchComponent } from '../../atoms/Switch';

const ScheduleTableRow = ({
    idx = 1,
    fullName = "Davron Salimjonov",
    homework = "Lorem ipsum dolor sit amet consecetur birbalo sirbalo"
}) => {
    const navigate = useNavigate()

    return (
        <tr className={cls.row}>
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