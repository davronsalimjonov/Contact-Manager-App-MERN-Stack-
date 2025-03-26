import { useState } from 'react';
import format from 'date-fns/format'
import { useNavigate } from 'react-router-dom';
import Table from '@/components/UI/moleculs/Table';
import { formatPrice, getUserFullName } from '@/utils/lib';
import EmployeeStatusBadge from '@/components/UI/atoms/EmployeeStatusBadge';
import TableActionButton from '@/components/UI/moleculs/TableActionButton';
import TransferSellerModal from '@/components/UI/organisms/TransferSellerModal';
import ChangeEmployeePasswordModal from '../ChangeEmployeePasswordModal';
import SellerPlanFormModal from '../SellerPlanFormModal';
import { EMPLOYEE_ROLES } from '@/constants/enum';

const SellersTable = ({ items = [] }) => {
    const navigate = useNavigate()
    const [planModal, setPlanModal] = useState({ isOpen: false, employeeId: null })
    const [transferModal, setTransferModal] = useState({ isOpen: false, employeeId: null })
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, employeeId: null, role: null })

    const tableActionButtons = row => {
        const buttons = [
            { label: 'Shaxsiy ma’lumotlari', onClick: () => navigate(`/sellers/${row.id}`) },
            { label: 'Parol o’zgartirish', onClick: () => setPasswordModal({ isOpen: true, employeeId: row.id, role: row.role }) },
            { label: 'Plan qo’yish', onClick: () => setPlanModal({ isOpen: true, employeeId: row.id }) }
        ]

        if(row.role !== EMPLOYEE_ROLES.SALES_TEAM_LEADER) {
            buttons.push({ label: 'Transfer qilish', onClick: () => setTransferModal({ isOpen: true, employeeId: row.id }) })
        }

        return buttons
    }

    const columns = [
        { key: "index", title: "№", render: (_, row, index) => index + 1, style: { width: '41px' } },
        { key: "fullName", title: "Ism, familiya", render: (_, row) => getUserFullName(row) },
        { key: "birthday", title: "Tug’ilgan kuni", render: (_, row) => row.birthday ? format(row.birthday, 'dd.MM.yyyy') : '' },
        { key: "status", title: "Status", render: (_, row) => <EmployeeStatusBadge status={row.status} /> },
        { key: 'plan', title: 'Plan', render: (_, row) => `${formatPrice(row.plan)} so'm` },
        { key: "address", title: "Doimiy yashash manzili" },
        { key: "actions", title: "", render: (_, row) => <TableActionButton menuItems={tableActionButtons(row)} />, style: { width: "48px" } }
    ]

    return (
        <>
            <ChangeEmployeePasswordModal
                isOpen={passwordModal?.isOpen}
                employeeId={passwordModal?.employeeId}
                role={passwordModal?.role}
                onClose={() => setPasswordModal({ isOpen: false, employeeId: null, role: null })}
            />
            <TransferSellerModal
                isOpen={transferModal.isOpen}
                employeeId={transferModal.employeeId}
                onClose={() => setTransferModal({ isOpen: false, employeeId: null })}
            />
            <SellerPlanFormModal
                isOpen={planModal?.isOpen}
                onClose={() => setPlanModal({ isOpen: false })}
                sellerId={planModal?.employeeId}
            />
            <Table
                columns={columns}
                data={items}
            />
        </>
    );
}

export default SellersTable;