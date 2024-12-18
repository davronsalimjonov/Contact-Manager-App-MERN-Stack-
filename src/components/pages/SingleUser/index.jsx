import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { customToast } from '@/utils/toast';
import { updateUser } from '@/services/user';
import Loader from '@/components/UI/atoms/Loader';
import { objectToFormData } from '@/utils/lib';
import useGetStudentCourseById from '@/hooks/useGetStudentCourseById';
import StudentInformationForm from '@/components/UI/organisms/StudentInformationForm';
import StudentPersonalInfo from '@/components/UI/organisms/StudentPersonalInfo';
import StudentActionHistory from '@/components/UI/organisms/StudentActionHistory';
import cls from './SingleUser.module.scss';
import useGetUserById from '@/hooks/useGetUserById';
import UserInformationForm from '@/components/UI/organisms/UserInformationForm';

const SingleUser = () => {
    const { userId } = useParams()
    const queryClient = useQueryClient()
    const { data: user, isLoading: isLoadingUser} = useGetUserById(userId) 
    
    const userFormData = {
        id: user?.id,
        avatar: user?.url,
        firstName: user?.firstName,
        lastName: user?.lastName,
        phone: user?.phone,
        secondPhone: user?.secondPhone,
        thirdPhone: user?.thirdPhone,
        birthday: user?.birthday,
        gender: String(user?.gender),
        createdAt: user?.createdAt ? dayjs(user?.createdAt).format('DD.MM.YYYY') : ''
    }

    const handleUpdateUser = async (data) => {
        try {
            delete data.id
            delete data.createdAt
            data.phone = data.phone
            data.secondPhone = data.secondPhone
            data.thirdPhone = data.thirdPhone
            data.gender = String(data.gender)

            if (!data?.birthday) delete data.birthday
            if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar

            const fd = objectToFormData(data)

            const updatedUser = await updateUser(userId, fd)
            queryClient.setQueryData(['user-course', userId], (oldData) => ({ ...oldData, user: updatedUser }))
            queryClient.setQueriesData(['students'], oldData => ({
                ...oldData,
                pages: oldData?.pages?.map(page => ({
                    ...page,
                    items: page?.items?.map(item => {
                        if (item?.user?.id === userId) {
                            item.user = updatedUser
                        }
                        return item
                    })
                }))
            }))
            toast.success("Malumotlar o'zgartirildi")
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <div className={cls.page}>
            {!isLoadingUser ? (
                <>
                    <UserInformationForm 
                        onSubmit={handleUpdateUser} 
                        defaultValues={userFormData} 
                        courseId={userId}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default SingleUser;