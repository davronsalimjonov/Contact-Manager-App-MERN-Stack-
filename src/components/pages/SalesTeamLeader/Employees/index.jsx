import { useState } from 'react';
import { PlusIcon } from '@/components/UI/atoms/icons';
import { useGetSellersByGroup, useGetTeamLeaderGroup } from '@/hooks/useSales';
import Loader from '@/components/UI/atoms/Loader';
import Button from '@/components/UI/atoms/Buttons/Button';
import SellersTable from '@/components/templates/SellersTable';
import CreateSellerFormModal from '@/components/UI/organisms/CreateSellerFormModal';
import cls from './Employees.module.scss';

const Employees = () => {
    const { data: group, isLoading: isLoadingGroup } = useGetTeamLeaderGroup()
    const [isOpenCreateSellerModal, setIsOpenCreateSellerModal] = useState(false);
    const { data: sellers, isLoading: isLoadingSellers } = useGetSellersByGroup(group?.id)

    return (!isLoadingGroup && !isLoadingSellers) ? (
        <div className={cls.page}>
            <CreateSellerFormModal 
                groupId={group?.id}
                isOpen={isOpenCreateSellerModal}
                onClose={() => setIsOpenCreateSellerModal(false)}
            />
            <Button onClick={() => setIsOpenCreateSellerModal(true)}>Xodim qoshish <PlusIcon /></Button>
            <SellersTable items={sellers?.items} />
        </div>
    ) : (
        <Loader />
    )
}

export default Employees;