import { useParams, useSearchParams } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import { useGetMentorById } from '@/hooks/useMentor';
import MentorInformationForm from '@/components/UI/organisms/MentorInformationForm';
import cls from './SingleMentor.module.scss';

const SingleMentor = () => {
    const { mentorId } = useParams()
    const [searchParams] = useSearchParams()
    const { data: mentor, isLoading: isLoadingMentor } = useGetMentorById(mentorId, { role: searchParams.get('role') })
console.log(mentor);

    return (
        <div className={cls.page}>
            {!isLoadingMentor ? (
                <MentorInformationForm />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default SingleMentor;