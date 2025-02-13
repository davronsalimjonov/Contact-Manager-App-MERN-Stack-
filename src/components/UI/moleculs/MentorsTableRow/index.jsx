import { Fragment } from 'react';
import Avatar from 'react-avatar';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { CARDS_TYPE } from '@/constants/enum';
import TableActionButton from '../TableActionButton';
import EmptyDataText from '../../atoms/EmptyDataText';
import MentorStatusBadge from '../../atoms/MentorStatusBadge';
import { GreenCardIcon, RedCardIcon, YellowCardIcon } from '../../atoms/icons';
import cls from './MentorsTableRow.module.scss';

const MentorsTableRow = ({
    index = 0,
    avatar = '',
    fullName = '',
    phoneNumber = '',
    degree = '',
    status = '',
    studentCount = 0,
    onClickMentorInfo,
    onClickAdjustment,
    cards = []
}) => {
    const formatedPhoneNumber = formatPhoneNumberIntl(phoneNumber)

    const menuItems = [
        { label: 'Mentor ma’lumotlari', onClick: onClickMentorInfo },
        { label: 'Bonus/jarima', onClick: onClickAdjustment },
    ]

    return (
        <tr className={cls.row} >
            <td>{index}</td>
            <td className={cls.row__name}>
                <Avatar
                    round
                    size={32}
                    src={`${avatar}`}
                    name={fullName}
                />
                <span title={fullName}>{fullName}</span>
            </td>
            <td>{formatedPhoneNumber || <EmptyDataText />}</td>
            <td>{degree || <EmptyDataText />}</td>
            <td><MentorStatusBadge status={status} /></td>
            <td className={cls.row__studentCount}>
                {studentCount} 
                <div className={cls.row__cards}>
                    {cards?.length > 0 && cards?.map((card, index) => (
                        <Fragment key={index}>
                        {card?.type === CARDS_TYPE.GREEN && <GreenCardIcon />}
                        {card?.type === CARDS_TYPE.YELLOW && <YellowCardIcon />}
                        {card?.type === CARDS_TYPE.RED && <RedCardIcon />}
                        </Fragment>
                    ))}
                </div>
            </td>
            <td><TableActionButton menuItems={menuItems} /></td>
        </tr>
    );
}

export default MentorsTableRow;