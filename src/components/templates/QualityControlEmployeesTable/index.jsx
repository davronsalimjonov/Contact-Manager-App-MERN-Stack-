import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { getUserFullName } from '@/utils/lib'
import Table from '@/components/UI/moleculs/Table'
import EmployeeStatusBadge from '@/components/UI/atoms/EmployeeStatusBadge'
import TableActionButton from '@/components/UI/moleculs/TableActionButton'
import QualityControlChangePasswordForm from '@/components/UI/organisms/QualityControlChangePasswordForm'
import { useState } from 'react'
import { EMPLOYEE_ROLES } from '@/constants/enum'
import { updateEmployeePassword } from '@/services/employee'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const QualityControlEmployeesTable = ({ items = [] }) => {
    const [isOpen, setIsOpen] = useState({ isOpen: false, id: null, role: null })
    const navigate = useNavigate()

    const menuItems = (row) => [
        { label: 'Shaxsiy ma’lumotlari', onClick: () => {
            navigate(`/employees/${row?.id}`)
        } },
        { label: 'Parol ozgartirish', onClick: () => setIsOpen({ isOpen: true, id: row?.id, role: EMPLOYEE_ROLES?.QUALITY_CONTROLLER }) },
    ]
    
    const columns = [
        { key: 'index', title: '№', render: (_, row, index) => index + 1, style: { width: '44px' } },
        { key: 'fullName', title: 'Ism,familiya', render: (_, row) => getUserFullName(row) },
        { key: 'phoneNumber', title: 'Telefon nomer', render: (_, row) => formatPhoneNumberIntl(row?.employee?.phone) },
        { key: 'status', title: 'Status', render: (status) => <EmployeeStatusBadge status={status} /> },
        { key: 'action', title: '', render: (_, row) => <TableActionButton menuItems={menuItems(row)} />, style: { width: '44px' } }
    ]

    const handleSubmitForm = async (data) => {
        try {
            await updateEmployeePassword(isOpen?.id, { ...data, role: isOpen?.role })
            toast.success('Parol muvaffaqiyatli o\'zgartirildi')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <>  
            <QualityControlChangePasswordForm
                isOpen={isOpen.isOpen}
                setIsOpen={setIsOpen}
                onClose={() => setIsOpen({ isOpen: false })}
                onSubmit={handleSubmitForm}
            />
            <Table columns={columns} data={items} />
        </>
    )
}

export default QualityControlEmployeesTable