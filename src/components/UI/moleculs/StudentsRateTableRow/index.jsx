import { formatDate } from "@/utils/formatDate";
import { StarIcon } from "../../atoms/icons";

const StudentsRateTableRow = ({
    index,
    date,
    ratedStudentCount,
    totalStudentCount,
    rate
}) => {
    return (
        <tr>
            <td width={60}>{index}.</td>
            <td width={293}>{formatDate(date)}</td>
            <td>{totalStudentCount}</td>
            <td>{ratedStudentCount}</td>
            <td><StarIcon begining={rate * 20} />{rate}</td>
        </tr>
    )
}

export default StudentsRateTableRow;