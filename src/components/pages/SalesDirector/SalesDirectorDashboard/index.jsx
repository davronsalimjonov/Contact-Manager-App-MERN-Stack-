import Button from '@/components/UI/atoms/Buttons/Button';
import { PlusIcon } from '@/components/UI/atoms/icons';
import SalesMonthlyPlanCard from '@/components/templates/SalesMonthlyPlanCard';
import cls from './SalesDirectorDashboard.module.scss';
import SalesTeamPlanFulfillmentCard from '@/components/UI/moleculs/SalesTeamPlanFulfillmentCard';
import PlanFormModal from '@/components/UI/organisms/PlanFormModal';
import { useState } from 'react';

const SalesDirectorDashboard = () => {
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
                <SalesTeamPlanFulfillmentCard />
                <SalesTeamPlanFulfillmentCard />
                <SalesTeamPlanFulfillmentCard />
            </div>
        </div>
    );
}

export default SalesDirectorDashboard;