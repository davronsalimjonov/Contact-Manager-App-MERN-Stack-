import toast from 'react-hot-toast';
import { useParams, useSearchParams } from 'react-router-dom';
import { objectToFormData } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import { useGetMentorById, useUpdateMentorMutation } from '@/hooks/useMentor';
import MentorInformationForm from '@/components/UI/organisms/MentorInformationForm';
import cls from './SingleMentor.module.scss';

const SingleMentor = () => {
    const { mentorId } = useParams()
    const [searchParams] = useSearchParams()
    const updateMentor = useUpdateMentorMutation()
    const { data: mentor, isLoading: isLoadingMentor } = useGetMentorById(mentorId, { role: searchParams.get('role') })

    const defaultValues = {
        firstName: mentor?.firstName ?? '',
        lastName: mentor?.lastName ?? '',
        phone: mentor?.phone ?? '',
        gender: String(mentor?.gender) ?? '',
        birthday: mentor?.birthday ?? '',
        avatar: mentor?.url ?? '',
        role: (mentor?.role) ?? '',
        degree: (mentor?.degree) ?? '',
        sip: mentor?.sip,
        status: mentor?.status
    }

    const handleUpdateMentor = async (values) => {
        const fd = objectToFormData({id: mentorId, ...values})

        await updateMentor.mutateAsync(fd, {
            onSuccess: () => toast.success('Mentor ma`lumotlari o`zgartirildi'),
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <div className={cls.page}>
            {!isLoadingMentor ? (
                <MentorInformationForm defaultValues={defaultValues} onSubmit={handleUpdateMentor} />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default SingleMentor;