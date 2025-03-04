import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { formatPrice } from '@/utils/lib';
import useGetUser from '@/hooks/useGetUser';
import Loader from '@/components/UI/atoms/Loader';
import { useGetMentorSalary } from '@/hooks/useStatistic';
import MentorSalaryTable from '@/components/templates/MentorSalaryTable';
import cls from './MentorSalary.module.scss';

const MentorSalary = () => {
    const [period] = useOutletContext()
    const { data: user } = useGetUser()
    const { mentorId } = useParams()
    const [searchParams] = useSearchParams()

    const userId = mentorId ||user?.id
    const userRole = searchParams.get('role') || user?.role

    const { data: mentorSalary, isLoading } = useGetMentorSalary({ mentorId: userId, role: userRole, startDate: period.startDate, endDate: period.endDate })

    return !isLoading ? (
        <div className={cls.page}>
            <div className={cls.page__table}>
                <MentorSalaryTable items={mentorSalary?.items || []} />
            </div>
            <div className={cls.page__total}>
                <span>Umumiy summa:</span>
                <span>{formatPrice(mentorSalary?.totalSum || 0)} UZS</span>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default MentorSalary;