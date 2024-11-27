import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { customToast } from '@/utils/toast';
import Loader from '@/components/UI/atoms/Loader';
import cls from './SingleSchedule.module.scss';
import useGetScheduleById from '@/hooks/useGetScheduleById';
import SingleScheduleForm from '@/components/UI/organisms/SingleScheduleForm';
import { updateSchedule } from '@/services/schedule';
import { useGetUserId } from '@/hooks/useGetUser';
import { LeftArrowIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';


const SingleSchedule = () => {
    const navigate = useNavigate()
    const { scheduleId } = useParams()
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const { data: schedule, isLoading: isLoadingSchedule } = useGetScheduleById(scheduleId)
    const defaultValues = {
        degree: schedule?.degree,
        weekday: schedule?.weekday,
        time: schedule?.time,
        endTime: schedule?.endTime,
    }
    const handleUpdateSchedule = async (data) => {
        try {
            const updatedSchedule = await updateSchedule(scheduleId, data)
            queryClient.setQueryData(['schedule', scheduleId], updatedSchedule);
            queryClient.setQueriesData(['schedule', userId], oldData => {
                return {
                    ...oldData,
                    pages: oldData.pages?.map(page => ({
                        ...page,
                        items: page?.items?.map(scheduleItem => {
                            if (scheduleItem.id === scheduleId) {
                                scheduleItem = { ...scheduleItem, ...data }
                            }
                            return scheduleItem
                        })
                    }))
                }
            });
            queryClient.invalidateQueries(['schedule', scheduleId])
            toast.success("Malumotlar o'zgartirildi")
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }
    return (
        <div className={cls.page}>
            {!isLoadingSchedule ? (
                <div className={cls.schedule}>
                         <Button className={cls.schedule__btn} type='button' onClick={()=>navigate(-1)}><LeftArrowIcon/></Button>
                    <h2 className={cls.schedule__header}>Dars jadvali</h2>
                    <SingleScheduleForm defaultValues={defaultValues} onSubmit={handleUpdateSchedule}/>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
export default SingleSchedule;