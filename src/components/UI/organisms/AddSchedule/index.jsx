import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { customToast } from '@/utils/toast';
import cls from './AddSchedule.module.scss';
import SingleScheduleForm from '@/components/UI/organisms/SingleScheduleForm';
import { addNewSchedule, updateSchedule } from '@/services/schedule';
import { useGetUserId } from '@/hooks/useGetUser';
import Dialog from '@/components/UI/moleculs/Dialog';
const AddSchedule = ({
    openModal,
    closeModal
}) => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const defaultValues = {
        degree: null,
        weekday: null,
        time: "",
        endTime: "",
    }
    const handleAddSchedule = async (schedule) => {
        schedule.teacher = userId;
        try {
            const { data } = addNewSchedule(schedule);
            queryClient.setQueriesData(['schedule', userId], oldData => {
                return {
                    ...oldData,
                    pages: oldData.pages?.map(page => ({
                        ...page,
                        items: page?.items?.map(scheduleItem => scheduleItem)
                    }))
                }
            });
            queryClient.invalidateQueries(['schedule'])
            toast.success("Yangi dars jadvali kiritildi.");
            closeModal();
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }
    return (
        <Dialog className={cls.page} isOpen={openModal} onClose={closeModal}>
            <div className={cls.schedule}>
                <h2 className={cls.schedule__header}>Dars jadvali</h2>
                <SingleScheduleForm defaultValues={defaultValues} onSubmit={handleAddSchedule} submitBtn={"Qo'shish"} />
            </div>
        </Dialog>
    );
}
export default AddSchedule;