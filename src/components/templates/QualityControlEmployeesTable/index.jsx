import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { getUserFullName } from '@/utils/lib'
import Table from '@/components/UI/moleculs/Table'
import EmployeeStatusBadge from '@/components/UI/atoms/EmployeeStatusBadge'
import TableActionButton from '@/components/UI/moleculs/TableActionButton'


const QualityControlEmployeesTable = ({ items = [] }) => {
    const menuItems = [
        { label: 'Shaxsiy ma’lumotlari', onClick: () => { } },
        { label: 'Parol ozgartirish', onClick: () => { } },
    ]
    
    const columns = [
        { key: 'index', title: '№', render: (_, row, index) => index + 1, style: { width: '44px' } },
        { key: 'fullName', title: 'Ism,familiya', render: (_, row) => getUserFullName(row) },
        { key: 'phoneNumber', title: 'Telefon nomer', render: (_, row) => formatPhoneNumberIntl(row?.employee?.phone) },
        { key: 'status', title: 'Status', render: (status) => <EmployeeStatusBadge status={status} /> },
        { key: 'action', title: '', render: () => <TableActionButton menuItems={menuItems} />, style: { width: '44px' } }
    ]

    return (
        <Table columns={columns} data={items} />
    )
}

export default QualityControlEmployeesTable