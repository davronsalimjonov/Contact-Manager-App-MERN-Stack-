import { formatPrice } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './MentorSalaryTable.module.scss';

const MentorSalaryTable = ({
    items = []
}) => {
    return items?.length > 0 ? (
        <table className={cls.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Nomi</th>
                    <th>Soni</th>
                    <th>Narxi</th>
                    <th>Umumiy narxi</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index) => (
                    <tr key={item?.id}>
                        <td>{index + 1}</td>
                        <td>{item?.title}</td>
                        <td>{item?.count}</td>
                        <td>{item?.amount == 0 ? "--" : `${formatPrice(item?.amount || 0)} UZS`}</td>
                        <td>{formatPrice(item?.totalAmount || 0)} UZS</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <EmptyData />
    )
}

export default MentorSalaryTable;