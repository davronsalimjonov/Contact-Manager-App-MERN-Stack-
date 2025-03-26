import format from 'date-fns/format'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, getUserFullName } from '@/utils/lib';
import { EMPLOYEE_ROLES } from '@/constants/enum';
import Loader from '@/components/UI/atoms/Loader';
import Table from '@/components/UI/moleculs/Table';
import useSessionState from '@/hooks/useSessionState';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import SalesGroupsSlider from '@/components/templates/SalesGroupsSlider';
import { useGetSalesGroups, useGetSellersByGroup } from '@/hooks/useSales';
import TableActionButton from '@/components/UI/moleculs/TableActionButton';
import EmployeeStatusBadge from '@/components/UI/atoms/EmployeeStatusBadge';
import SellerPlanFormModal from '@/components/templates/SellerPlanFormModal';
import SalesTeamLeaderCard from '@/components/UI/organisms/SalesTeamLeaderCard';
import SalesGroupFormModal from '@/components/UI/organisms/SalesGroupFormModal';
import TransferSellerModal from '@/components/UI/organisms/TransferSellerModal';
import CreateSellerFormModal from '@/components/UI/organisms/CreateSellerFormModal';
import ChangeEmployeePasswordModal from '@/components/templates/ChangeEmployeePasswordModal';
import cls from './SalesGroups.module.scss';

const SalesGroups = () => {
    const navigate = useNavigate()
    const [activeGroup, setActiveGroup] = useSessionState('activeGroup', null)
    const [isOpenGroupModal, setIsOpenGroupModal] = useState(false)
    const [isOpenCreateSellerModal, setIsOpenCreateSellerModal] = useState(false)
    const [transferModal, setTransferModal] = useState({ isOpen: false, employeeId: null })
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, employeeId: null, role: null })
    const [planModal, setPlanModal] = useState({ isOpen: false, employeeId: null })
    const { data: salesGroups, isLoading: isLoadingSalesGroups } = useGetSalesGroups()
    const { data: sellers, isLoading: isLoadingSellers } = useGetSellersByGroup(activeGroup?.id)

    useEffect(() => {
        if (!isLoadingSalesGroups && salesGroups?.length > 0 && !activeGroup) {
            setActiveGroup(salesGroups[0])
        }
    }, [isLoadingSalesGroups])

    const tableActionButtons = row => ([
        { label: 'Shaxsiy ma’lumotlari', onClick: () => navigate(`/sellers/${row.id}`) },
        { label: 'Transfer qilish', onClick: () => setTransferModal({ isOpen: true, employeeId: row.id }) },
        { label: 'Parol o’zgartirish', onClick: () => setPasswordModal({ isOpen: true, employeeId: row.id, role: row.role }) },
        { label: 'Plan qo’yish', onClick: () => setPlanModal({ isOpen: true, employeeId: row.id }) }
    ])

    const columns = [
        { key: "index", title: "№", render: (_, row, index) => index + 1, style: { width: '41px' } },
        { key: "fullName", title: "Ism, familiya", render: (_, row) => getUserFullName(row) },
        { key: "birthday", title: "Tug’ilgan kuni", render: (_, row) => row.birthday ? format(row.birthday, 'dd.MM.yyyy') : '' },
        { key: "status", title: "Status", render: (_, row) => <EmployeeStatusBadge status={row.status} /> },
        { key: 'plan', title: 'Plan', render: (_, row) => `${formatPrice(row.plan)} so'm` },
        { key: "address", title: "Doimiy yashash manzili" },
        { key: "actions", title: "", render: (_, row) => <TableActionButton menuItems={tableActionButtons(row)} />, style: { width: "48px" } }
    ]

    return !isLoadingSalesGroups ? (
        <>
            <SalesGroupFormModal
                onClose={() => setIsOpenGroupModal(false)}
                isOpen={isOpenGroupModal}
                isCreate
            />
            <ChangeEmployeePasswordModal 
                isOpen={passwordModal?.isOpen}
                employeeId={passwordModal?.employeeId}
                role={passwordModal?.role}
                onClose={() => setPasswordModal({ isOpen: false, employeeId: null, role: null })}
            />
            <CreateSellerFormModal
                isOpen={isOpenCreateSellerModal}
                onClose={() => setIsOpenCreateSellerModal(false)}
            />
            <TransferSellerModal
                isOpen={transferModal.isOpen}
                employeeId={transferModal.employeeId}
                currentGroup={activeGroup?.id}
                onClose={() => setTransferModal({ isOpen: false, employeeId: null })}
            />
            <SellerPlanFormModal
                isOpen={planModal?.isOpen}
                onClose={() => setPlanModal({ isOpen: false })}
                sellerId={planModal?.employeeId}
            />
            <div className={cls.page}>
                <div className={cls.page__header}>
                    <h1 className={cls.page__header__title}>“{activeGroup?.title}” jamoasi</h1>
                    <div className={cls.page__header__btns}>
                        <Button onClick={() => setIsOpenCreateSellerModal(true)}>Xodim qo’shish <PlusIcon /></Button>
                        <Button onClick={() => setIsOpenGroupModal(true)}>Guruh qo’shish <PlusIcon /></Button>
                    </div>
                </div>
                <SalesGroupsSlider
                    items={salesGroups}
                    activeGroup={activeGroup}
                    onClickGroup={group => setActiveGroup(group)}
                    onChangePassword={() => { }}
                />
                {!isLoadingSellers ? (
                    <>
                        <SalesTeamLeaderCard
                            groupId={activeGroup?.id}
                            avatar={sellers?.teamLead?.url}
                            fullName={getUserFullName(sellers?.teamLead)}
                            onClickDetails={() => navigate(`/sellers/${sellers?.teamLead?.id}`)}
                            onClickChangePassword={() => setPasswordModal({ isOpen: true, employeeId: sellers?.teamLead?.id, role: EMPLOYEE_ROLES.SALES_TEAM_LEADER })}
                        />
                        <Table 
                            columns={columns} 
                            data={sellers?.items} 
                        />
                    </>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    ) : (
        <Loader />
    )
}

export default SalesGroups;