import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import { EMPLOYEE_ROLES } from '@/constants/enum';
import Loader from '@/components/UI/atoms/Loader';
import useSessionState from '@/hooks/useSessionState';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import SellersTable from '@/components/templates/SellersTable';
import SalesGroupsSlider from '@/components/templates/SalesGroupsSlider';
import { useGetSalesGroups, useGetSellersByGroup } from '@/hooks/useSales';
import SalesTeamLeaderCard from '@/components/UI/organisms/SalesTeamLeaderCard';
import SalesGroupFormModal from '@/components/UI/organisms/SalesGroupFormModal';
import CreateSellerFormModal from '@/components/UI/organisms/CreateSellerFormModal';
import ChangeEmployeePasswordModal from '@/components/templates/ChangeEmployeePasswordModal';
import cls from './SalesGroups.module.scss';

const SalesGroups = () => {
    const navigate = useNavigate()
    const [activeGroup, setActiveGroup] = useSessionState('activeGroup', null)
    const [isOpenGroupModal, setIsOpenGroupModal] = useState(false)
    const [isOpenCreateSellerModal, setIsOpenCreateSellerModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, employeeId: null, role: null })
    const { data: salesGroups, isLoading: isLoadingSalesGroups } = useGetSalesGroups()
    const { data: sellers, isLoading: isLoadingSellers } = useGetSellersByGroup(activeGroup?.id)

    useEffect(() => {
        if (!isLoadingSalesGroups && salesGroups?.length > 0 && !activeGroup) {
            setActiveGroup(salesGroups[0])
        }
    }, [isLoadingSalesGroups])

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
                        <SellersTable items={sellers?.items} />
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