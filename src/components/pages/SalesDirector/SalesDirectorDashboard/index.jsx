import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import PlanFormModal from '@/components/UI/organisms/PlanFormModal';
import SalesMonthlyPlanCard from '@/components/templates/SalesMonthlyPlanCard';
import SalesTeamPlanFulfillmentCard from '@/components/UI/moleculs/SalesTeamPlanFulfillmentCard';
import cls from './SalesDirectorDashboard.module.scss';

const SalesDirectorDashboard = () => {
    const navigate = useNavigate()
    const [isOpenPlanModal, setIsOpenPlanModal] = useState(false)

    return (
        <div className={cls.page}>
            <PlanFormModal
                isOpen={isOpenPlanModal}
                onClose={() => setIsOpenPlanModal(false)}
            />
            <Button className={cls.page__btn} onClick={() => setIsOpenPlanModal(true)}>Oylik plan qo’yish <PlusIcon /></Button>
            <SalesMonthlyPlanCard />
            <div className={cls.page__teams}>
                <SalesTeamPlanFulfillmentCard onClick={() => navigate('/groups/1')} />
                <SalesTeamPlanFulfillmentCard onClick={() => navigate('/groups/1')} />
                <SalesTeamPlanFulfillmentCard onClick={() => navigate('/groups/1')} />
            </div>
        </div>
    );
}

export default SalesDirectorDashboard;