import { formatPrice } from '@/utils/lib';
import { StarIcon } from '../../atoms/icons';
import cls from './CallMentorsStatisticTableRow.module.scss';

const CallMentorsStatisticTableRow = ({
    index = 0,
    fullName = '',
    callsCount = 0,
    adaptationCount = 0,
    mentorActivityPercentage = 0,
    salary = '',
    rating = 0,
    onClick
}) => {
    return (
        <tr className={cls.row} onClick={onClick}>
            <td>{index}</td>
            <td>{fullName}</td>
            <td>{callsCount} ta</td>
            <td>{adaptationCount} ta</td>
            <td>{mentorActivityPercentage} %</td>
            <td>{formatPrice(salary)} so'm</td>
            <td><StarIcon begining={rating * 20} />{rating}</td>
        </tr>
    );
}

export default CallMentorsStatisticTableRow;