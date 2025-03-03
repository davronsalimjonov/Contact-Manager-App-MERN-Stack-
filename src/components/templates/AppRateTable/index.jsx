import Avatar from 'react-avatar';
import cls from './AppRateTable.module.scss';
import { StarIcon } from '@/components/UI/atoms/icons';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';

const AppRateTable = ({
    items = [],
    startIndex = 0
}) => {
    return items?.length > 0 ? (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Ism-familiya</th>
                    <th>Izoh</th>
                    <th>O’quvchilar baholari</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index) => (
                    <tr className={cls.row} key={item?.id}>
                    <td>{startIndex + index + 1}</td>
                    <td className={cls.row__name}>
                        <Avatar src={item?.user?.url} name={getUserFullName(item?.user)} size={36} round /> {getUserFullName(item?.user)}
                    </td>
                    <td className={cls.row__description}>
                        <span title={item?.comment}>{item?.comment}</span>
                    </td>
                    <td className={cls.row__stars}><StarIcon /> {item?.rate}</td>
                </tr>
                ))}
            </tbody>
        </table>
    ) : <EmptyData />;
}

export default AppRateTable;