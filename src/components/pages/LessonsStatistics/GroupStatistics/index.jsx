import { useOutletContext } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import { useGetMentorsRateByGroup } from '@/hooks/useServiceStatistics';
import MentorLessonStatisticsTable from '@/components/templates/MentorLessonStatisticsTable';
import cls from './GroupStatistics.module.scss';

const GroupStatistics = () => {
    const [period] = useOutletContext()
    const { data: mentors, isLoading } = useGetMentorsRateByGroup({ startDate: period.startDate, endDate: period.endDate })

    return (
        <div className={cls.page}>
            <div className={cls.page__content}>
                {isLoading ? <Loader /> : <MentorLessonStatisticsTable items={mentors} />}
            </div>
        </div>
    )
}

export default GroupStatistics;