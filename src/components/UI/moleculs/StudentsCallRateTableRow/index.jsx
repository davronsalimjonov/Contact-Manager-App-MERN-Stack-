import { formatDate } from "@/utils/formatDate";
import { StarIcon } from "../../atoms/icons";
import Avatar from "react-avatar";
import { getUserFullName } from "@/utils/lib";
import { formatTime } from "@/utils/formatTime";
import cls from './StudentsCallRateTableRow.module.scss';

const StudentsCallRateTableRow = ({
    index,
    avatar,
    teacher,
    date,
    duration,
    comment,
    rate

}) => {
    return (
        <tr>
            <td width={60}>{index}.</td>
            <td className={cls.avatar}><Avatar size="24" src={avatar} name={getUserFullName(teacher)} round={true} />{getUserFullName(teacher)}</td>
            <td>{date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')}</td>
            <td>{duration ? formatTime(duration) : ""}</td>
            <td width={352}>{comment}</td>
            <td><StarIcon begining={rate * 20} />{rate}</td>
        </tr>
    )
}

export default StudentsCallRateTableRow;