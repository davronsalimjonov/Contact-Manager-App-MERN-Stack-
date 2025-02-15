import Avatar from 'react-avatar'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getUserFullName } from '@/utils/lib'
import { formatTime } from '@/utils/formatTime'
import Loader from '@/components/UI/atoms/Loader'
import Button from '@/components/UI/atoms/Buttons/Button'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import useGetCallMentorStatistic from '@/hooks/useGetCallMentorsStatistic'
import StudentsLevelChart from '@/components/UI/organisms/StudentsCountChart'
import NewStudentsCountChart from '@/components/UI/organisms/ActiveStudentsCountChart'
import { LeftArrowIcon, MetricCashIcon, MetricStarsIcon, MetricTimeIcon, StarIcon } from '@/components/UI/atoms/icons'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './CallMentorStatistic.module.scss'

const CallMentorStatistic = () => {
    const { mentorId } = useParams();
    const [period] = useOutletContext();

    const {
        rating: { data: rating, isLoading: isLoadingRating },
        audioCallCount: { data: audioCallCount, isLoading: isLoadingAudioCallCount },
        studentsCountByCourse: { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse },
        studentsCountByLevel: { data: studentsCountByLevel, isLoading: isLoadingStudentsCountByLevel },
        studentsActivity: { data: studentsActivity, isLoading: isLoadingStudentsActivity },
        mentor: { data: mentor, isLoadingMentor }
    } = useGetCallMentorStatistic({ mentorId: mentorId, startDate: period.startDate, endDate: period.endDate })
    const navigate = useNavigate();

    return (
        <div className={cls.page}>
            {(
                !isLoadingAudioCallCount &&
                !isLoadingRating &&
                !isLoadingStudentsCountByCourse &&
                !isLoadingStudentsCountByLevel &&
                !isLoadingStudentsActivity &&
                !isLoadingMentor
            ) ? (
                <>
                    {mentor && <div className={cls.page__avatar}>
                        <Button className={cls.page__back__button} type='button' onClick={() => navigate(-1)}><LeftArrowIcon /></Button>
                        <Avatar src={mentor?.url} name={getUserFullName(mentor)} size={48} round />
                        <h2 className={cls.page__avatar__name}>{mentor?.firstName + " " + mentor?.lastName}</h2>
                    </div>}
                    <div className={cls.page__metrics}>
                        <MetricCard
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
                            title='O’quvchilar aktivligi'
                            value={(studentsActivity?.active || 0 + '%')}
                            percentage={studentsActivity?.percentage || 0}
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

export default CallMentorStatistic; 