import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';  
import { customToast } from '@/utils/toast';
import Loader from '@/components/UI/atoms/Loader';
import { objectToFormData } from '@/utils/lib';
import MentorInformationForm from '@/components/UI/organisms/MentorInformationForm';
import cls from './SingleMentor.module.scss';
import { useGetSingleMentor } from '@/hooks/useGetSingleMentor';
import { createMentors, updateMentors } from '@/services/mentors';

const SingleMentor = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const mentorRole = searchParams.get('role')
    const { mentorId } = useParams()
    const { pathname } = useLocation()
    const { singleMentor: { data: singleMentor, isLoading: isLoadingSingleMentor }} = useGetSingleMentor(mentorId , {role: mentorRole}, [mentorId, mentorRole])
    const isUpdateMode = pathname.startsWith(`/mentors/mentor/${mentorId}`)
    
    const studentFormData = {
        role: singleMentor?.role,
        degree: singleMentor?.degree,   
        avatar: singleMentor?.url,
        firstName: singleMentor?.firstName,
        lastName: singleMentor?.lastName,
        phone: singleMentor?.phone,
        birthday: singleMentor?.birthday,
        gender: String(singleMentor?.gender),
        createdAt: singleMentor?.createdAt ? dayjs(singleMentor?.createdAt).format('DD.MM.YYYY') : ''
    }

    const handleUpdateMentor = async (data) => {
        try {
            delete data.createdAt
            data.phone = data.phone
            data.gender = String(data.gender)

            if (!data?.birthday) delete data.birthday
            if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar

            const fd = objectToFormData(data)
            await updateMentors(mentorId, fd)
            navigate(-1)
            toast.success("Malumotlar o'zgartirildi")
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }

    const handleCreateMentor = async (data) => {
        try {
            delete data.id
            delete data.createdAt
            data.phone = data.phone
            data.gender = String(data.gender)

            if (!(data?.avatar instanceof File) && data?.avatar !== null) delete data.avatar

            if (!data?.firstName) {
                customToast.error("Ism Kiriting")
                return
            } else if (!data?.lastName) {
                customToast.error("Familiya Kiriting")
                return
            } else if (!data?.gender) {
                customToast.error("Jinsini Kiriting")
                return
            } else if (!data?.role) {
                customToast.error("Mentor Rolini Kiriting")
                return
            } else if (!data?.degree) {
                customToast.error("Mentor Darajasini Kiriting")
                return
            }

            const fd = objectToFormData(data)
            await createMentors(fd)
            navigate(-1)
            toast.success("Mentor yaratildi")
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')
        }
    }

    return (
        <div className={cls.page}>
            {!isLoadingSingleMentor ? (
                <>
                    <MentorInformationForm 
                        onSubmit={isUpdateMode ? handleUpdateMentor : handleCreateMentor} 
                        defaultValues={studentFormData}
                        role={mentorRole}
                        isUpdateMode={isUpdateMode}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default SingleMentor;