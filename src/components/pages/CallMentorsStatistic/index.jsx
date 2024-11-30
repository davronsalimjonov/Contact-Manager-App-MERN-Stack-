import { useOutletContext, useParams } from 'react-router-dom'
import Loader from '@/components/UI/atoms/Loader'
import { getUserFullName } from '@/utils/lib'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import StudentsLevelChart from '@/components/UI/organisms/StudentsLevelChart'
import NewStudentsCountChart from '@/components/UI/organisms/NewStudentsCountChart'
import { MetricCashIcon, MetricPersonsIcon, MetricStarsIcon, MetricTimeIcon, StarIcon } from '@/components/UI/atoms/icons'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './CallMentorStatistic.module.scss'
import Avatar from 'react-avatar'
import useGetCallMentorStatistic from '@/hooks/useGetCallMentorsStatistic'
import { formatTime } from '@/utils/formatTime'

const CallMentorStatistic = () => {
    const { mentorId } = useParams();
    const [period] = useOutletContext();

    const {
        rating: { data: rating, isLoading: isLoadingRating },
        audioCallCount: { data: audioCallCount, isLoading: isLoadingAudioCallCount },
        studentsCountByCourse: { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse },
        studentsCountByLevel: { data: studentsCountByLevel, isLoading: isLoadingStudentsCountByLevel },

        mentor: { data: mentor, isLoadingMentor }
    } = useGetCallMentorStatistic({ mentorId: mentorId, startDate: period.startDate, endDate: period.endDate })

    return (
        <div className={cls.page}>
            {(
                !isLoadingAudioCallCount &&
                !isLoadingRating &&
                !isLoadingStudentsCountByCourse &&
                !isLoadingStudentsCountByLevel &&
                !isLoadingMentor
            ) ? (
                <>
                    {mentor && <div className={cls.page__avatar}>
                        <Avatar src={mentor?.url} name={getUserFullName(mentor)} size={48} round />
                        <h2 className={cls.page__avatar__name}>{mentor.firstName + " " + mentor.lastName}</h2>
                    </div>}
                    <div className={cls.page__metrics}>
                        <MetricCard   //TODO
                            title="Qo’ng’iroqlar soni"
                            value={`${audioCallCount?.count || 0} ta`}
                            percentage={audioCallCount?.countPercentage || 0}
                            icon={<MetricTimeIcon />}
                            iconBg='rgba(0, 182, 155, 0.21)'
                        />
                        <MetricCard
                            title='Reytinggi'
                            value={<><StarIcon begining={rating?.rate * 20} />{rating?.rate}</>}
                            percentage={rating?.ratePercentage}
                            icon={<MetricStarsIcon />}

                            iconBg='rgba(255, 0, 0, 0.21)'
                        />
                        <MetricCard
                            title='Qo’ng’iroq davomiyligi'
                            value={formatTime(audioCallCount?.duration || 0) + 's'}
                            percentage={audioCallCount?.durationPercentage || 0}
                            icon={<MetricTimeIcon />}
                            iconBg='rgba(160, 188, 241, 0.3)'
                        />
                        <MetricCard
                            title='Task bajarish tezligi'   //TODO
                            value={formatTime(80)}
                            percentage={"80%"}
                            icon={<MetricCashIcon />}
                            iconBg='rgba(254, 197, 61, 0.2)'
                        />

                    </div>
                    <div className={cls.page__charts}>
                        <CoursesChart
                            title='O’qiydigan kurslari bo’yicha'
                            courses={studentsCountByCourse}
                        />
                        <StudentsLevelChart
                            title='O’quvchilar statuslari bo’yicha'
                            levels={studentsCountByLevel}
                        />
                    </div>
                    <NewStudentsCountChart
                        mentorId={mentorId}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default CallMentorStatistic