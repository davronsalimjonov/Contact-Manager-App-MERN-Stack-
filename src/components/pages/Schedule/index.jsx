import ScheduleTable from '@/components/templates/ScheduleTable';
import useGetSchedule from '@/hooks/useGetSchedule';
import AddSchedule from '../../UI/organisms/AddSchedule';
import { useState } from 'react';
import cls from './Schedule.module.scss';
import useGetGroups from '@/hooks/useGetGroups';
import ScheduleSearchBar from '@/components/UI/organisms/ScheduleSearchBar';

const Schedule = () => {
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState({})
    const { ref, data: schedule, isLoading: isLoadingSchedule, refetch } = useGetSchedule(filter);
    const { groups: {data: groups, isLoading: isLoadingGroups}} = useGetGroups({}, '')
    const groupOptions = !isLoadingGroups && groups.map((group) => ({ value: group?.id, label: group?.title }))
    

    const handleOpen = () => {
        setOpenModal(true);
    }
    const handleClose = () => {
        setOpenModal(false);
    }


    return (
        <div className={cls.page}>
            <ScheduleSearchBar
                onChangeDegree={(degree) => setFilter(state => ({ ...state, degree: degree?.value }))}
                onChangeWeekday={(weekday) => setFilter(state => ({ ...state, weekday: weekday?.value }))}
                onAddLesson={handleOpen}
            />
            <ScheduleTable
                triggerRef={ref}
                schedule={schedule}
                isLoading={isLoadingSchedule}
            />
            <AddSchedule 
                refetch={refetch}
                openModal={openModal} 
                closeModal={handleClose} 
                groupOptions={groupOptions} 
                isLoading={isLoadingGroups} 
            />
        </div>
    );
}

export default Schedule;