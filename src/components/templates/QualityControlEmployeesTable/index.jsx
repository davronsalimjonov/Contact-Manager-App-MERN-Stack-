import QualityControlEmployeesTableRow from '@/components/UI/moleculs/QualityControlEmployeesTableRow'
import cls from './QualityControlEmployeesTable.module.scss'
import EmptyData from '@/components/UI/organisms/EmptyData'
import { getUserFullName } from '@/utils/lib'

const QualityControlEmployeesTable = ({
    employees = []
}) => {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {employees?.length === 0 ? (
                <EmptyData text='Ma`lumotlar mavjud emas' />
            ) : (
                <table className={cls.table}>
                    <thead className={cls.head}>
                        <tr >
                            <th>№</th>
                            <th>Ism,familiya</th>
                            <th>Telefon nomer</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <QualityControlEmployeesTableRow
                                key={employee?.id}
                                index={index + 1}
                                fullName={getUserFullName(employee)}
                                phoneNumber={employee?.employee?.phone}
                                status={employee?.status}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default QualityControlEmployeesTable