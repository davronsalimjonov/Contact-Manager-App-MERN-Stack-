import { useState } from 'react';
import { PlusIcon } from '@/components/UI/atoms/icons';
import { useGetSellersByGroup, useGetTeamLeaderGroup } from '@/hooks/useSales';
import Button from '@/components/UI/atoms/Buttons/Button';
import SellersTable from '@/components/templates/SellersTable';
import CreateSellerFormModal from '@/components/UI/organisms/CreateSellerFormModal';
import cls from './Employees.module.scss';

const Employees = () => {
    const { data: group } = useGetTeamLeaderGroup()
    const [isOpenCreateSellerModal, setIsOpenCreateSellerModal] = useState(false);
    const { data: sellers } = useGetSellersByGroup(group?.id)

    return (
        <div className={cls.page}>
            <CreateSellerFormModal 
                groupId={group?.id}
                isOpen={isOpenCreateSellerModal}
                onClose={() => setIsOpenCreateSellerModal(false)}
            />
            <Button onClick={() => setIsOpenCreateSellerModal(true)}>Xodim qoshish <PlusIcon /></Button>
            <SellersTable items={sellers?.items} />
        </div>
    );
}

export default Employees;