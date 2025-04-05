import Table from '@/components/UI/moleculs/Table'
import Avatar from '@/components/UI/atoms/Avatar'
import { getUserFullName } from '@/utils/lib'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import cls from "./QualityControlSalesTable.module.scss"

const QualityControlSalesTable = ({ items = [] }) => {
    const columns = [
        { key: 'index', title: '№', render: (_, row, index) => index + 1, style: { width: '44px' } },
        { key: 'fullName', title: 'Ism,familiya', render: (operator) => getUserFullName(operator) },
        { key: 'phoneNumber', title: 'Telefon nomer', render: (phone) => formatPhoneNumberIntl(phone) },
        { key: 'warning', title: 'Ogohlantirish', render: (warning) => warning },
        { key: 'penalty', title: 'Jarimalar', render: (penalty) => penalty },
        { key: 'sum', title: 'Summa', render: (sum) => (<span>{sum} UZS</span>) },
        { key: 'operator', title: 'Operator', render: (operator) => (<div className={cls.avatar}><Avatar src={operator?.url} /><span>{getUserFullName(operator)}</span></div>) },
        { key: 'employee', title: 'Xodim', render: (employee) => (<div className={cls.avatar}><Avatar src={employee?.url} /><span>{getUserFullName(employee)}</span></div>) },
    ]

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Table
                columns={columns}
                data={items}
            />
        </div>
    )
}

export default QualityControlSalesTable