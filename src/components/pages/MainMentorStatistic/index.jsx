import Avatar from 'react-avatar'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getUserFullName } from '@/utils/lib'
import Loader from '@/components/UI/atoms/Loader'
import { formatNumber } from '@/utils/formatNumber'
import Button from '@/components/UI/atoms/Buttons/Button'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import useGetMainMentorStatistic from '@/hooks/useGetMainMentorStatistic'
import StudentsLevelChart from '@/components/UI/organisms/StudentsLevelChart'
import NewStudentsCountChart from '@/components/UI/organisms/NewStudentsCountChart'
import { LeftArrowIcon, MetricCashIcon, MetricPersonsIcon, MetricStarsIcon, MetricTimeIcon, StarIcon } from '@/components/UI/atoms/icons'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './MainMentorStatistic.module.scss'

const MainMentorStatistic = () => {
    const { mentorId } = useParams();
    const [period] = useOutletContext();

    const {
        studentsCount: { data: studentsCount, isLoading: isLoadingstudentsCount },
        studentsActivity: { data: studentsActivity, isLoading: isLoadingStudentsActivity },
        lessonRate: { data: lessonRate, isLoading: isLoadingLessonRate },
        studentsCountByCourse: { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse },
        studentsCountByLevel: { data: studentsCountByLevel, isLoading: isLoadingStudentsCountByLevel },
        mentorSalary: { data: mentorSalary, isLoading: isLoadingMentorSalary },
        mentor: { data: mentor, isLoadingMentor }
    } = useGetMainMentorStatistic({ mentorId: mentorId, startDate: period.startDate, endDate: period.endDate })

    const navigate = useNavigate();

    return (
        <div className={cls.page}>
            {(
                !isLoadingstudentsCount &&
                !isLoadingStudentsActivity &&
                !isLoadingStudentsCountByCourse &&
                !isLoadingStudentsCountByLevel &&
                !isLoadingLessonRate &&
                !isLoadingMentorSalary &&
                !isLoadingMentor
            ) ? (
                <>
                    {mentor && <div className={cls.page__avatar}>
                        <Button className={cls.page__back__button} type='button' onClick={() => navigate(-1)}><LeftArrowIcon /></Button>
                        <Avatar src={mentor?.url} name={getUserFullName(mentor)} size={48} round />
                        <h2 className={cls.page__avatar__name}>{mentor.firstName + " " + mentor.lastName}</h2>
                    </div>}
                    <div className={cls.page__metrics}>
                        <MetricCard
                            title="O'quvchilar soni"
                            value={`${studentsCount || 0} nafar`}
                            percentage={studentsCount?.countPercentage || 0}
                            icon={<MetricPersonsIcon />}

                            iconBg='rgba(0, 182, 155, 0.21)'
                        />
                        <MetricCard
                            title='O’quvchilar aktivligi'
                            value={(studentsActivity?.active + '%') || 0}
                            percentage={studentsActivity?.percentage || 0}
                            icon={<MetricTimeIcon />}
                            iconBg='rgba(160, 188, 241, 0.3)'
                        />
                        <MetricCard
                            title='O’rtacha oylik maoshi'
                            value={formatNumber(mentorSalary?.salaryAmount)}
                            percentage={mentorSalary?.salaryPercentage || 0}
                            icon={<MetricCashIcon />}
                            iconBg='rgba(254, 197, 61, 0.2)'
                        />
                        <MetricCard
                            title='O’rtacha reytinggi'
                            value={<><StarIcon begining={lessonRate?.rate * 20} />{lessonRate?.rate}</>}
                            percentage={lessonRate?.ratePercentage}
                            icon={<MetricStarsIcon />}
                            iconBg='rgba(255, 0, 0, 0.21)'
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

export default MainMentorStatistic