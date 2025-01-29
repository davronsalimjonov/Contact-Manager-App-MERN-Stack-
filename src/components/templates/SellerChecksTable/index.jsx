import ChecksTableRow from '@/components/UI/organisms/ChecksTableRow';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './SellerChecksTable.module.scss';

const SellerChecksTable = ({
    checks = []
}) => {
    return (
        checks?.length > 0 ? (
            <table className={cls.table}>
            <thead className={cls.table__head}>
                <tr>
                    <th>№</th>
                    <th>Klient</th>
                    <th>Vaqt</th>
                    <th>To'lov turi</th>
                    <th>Summa</th>
                    <th>Foyda</th>
                    <th>Zarar</th>
                </tr>
            </thead>
            <tbody>
                {checks?.map((check) => (
                    <ChecksTableRow
                        key={check?.id}
                        fullName={check?.name}
                        date={check?.date}
                        paymentMethod={check?.type}
                        sum={check?.sum}
                        profit={check?.profit}
                        index={check?.index}
                    />
                ))}
            </tbody>
        </table>
        ) : (
            <EmptyData />
        )
    );
}

export default SellerChecksTable;