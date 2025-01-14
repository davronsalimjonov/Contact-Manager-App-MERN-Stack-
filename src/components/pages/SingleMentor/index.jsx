import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';  
import { customToast } from '@/utils/toast';
import Loader from '@/components/UI/atoms/Loader';
import { objectToFormData } from '@/utils/lib';
import MentorInformationForm from '@/components/UI/organisms/MentorInformationForm';
import cls from './SingleMentor.module.scss';
import { useGetSingleMentor } from '@/hooks/useGetSingleMentor';
import { updateMentors } from '@/services/mentors';

const SingleMentor = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const mentorRole = searchParams.get('role')
    const { mentorId } = useParams()
    const {singleMentor: { data: singleMentor, isLoading: isLoadingSingleMentor }} = useGetSingleMentor(mentorId , {role: mentorRole}, [mentorId, mentorRole])
   

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

    const handleUpdateUser = async (data) => {
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

    return (
        <div className={cls.page}>
            {!isLoadingSingleMentor ? (
                <>
                    <MentorInformationForm 
                        onSubmit={handleUpdateUser} 
                        defaultValues={studentFormData}
                        role={mentorRole}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default SingleMentor;