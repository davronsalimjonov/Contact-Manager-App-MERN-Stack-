import ScheduleSearchBar from '@/components/UI/organisms/ScheduleSearchBar';
import ScheduleTable from '@/components/templates/ScheduleTable';
import useGetSchedule from '@/hooks/useGetSchedule';
import AddSchedule from '../../UI/organisms/AddSchedule';
import { useState } from 'react';
import cls from './Schedule.module.scss';

const Schedule = () => {
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState({})
    const { ref, data: schedule, isLoading: isLoadingSchedule } = useGetSchedule(filter);
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
            <AddSchedule openModal={openModal} closeModal={handleClose} />
        </div>
    );
}

export default Schedule;