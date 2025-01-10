import { useOutletContext } from 'react-router-dom'
import Loader from '@/components/UI/atoms/Loader'
import useGetStatistic from '@/hooks/useGetStatistic'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import NewStudentsCountChart from '@/components/UI/organisms/NewStudentsCountChart'
import { MetricCashIcon, MetricPersonsIcon, MetricStarsIcon, MetricTimeIcon, StarIcon } from '@/components/UI/atoms/icons'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './MainMentor.module.scss'
import StudentsStatusChart from '@/components/UI/organisms/StudentsStatusChart'

const MainMentor = () => {
    const [period] = useOutletContext()
    const {
        callCount: { data: callCount, isLoading: isLoadingCallCount },
        rating: { data: rating, isLoading: isLoadingRating },
        studentsCountByCourse: { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse },
        studentsCountByLevel: { data: studentsCountByLevel, isLoading: isLoadingStudentsCountByLevel },
        newStudentsCount: { data: newStudentsCount, isLoading: isLoadingNewStudentsCount },
        statusUser: {data: statusUser, isLoading: isLoadingStatusUser},
        studentActivity: {data: studentActivity, isLoading: isLoadingStudentActivity},
        mentorSalary: {data: mentorSalary, isLoading: isLoadingMentorSalary},
    } = useGetStatistic({ startDate: period.startDate, endDate: period.endDate })

    return (
        <div className={cls.page}>
            {(
                !isLoadingCallCount &&
                !isLoadingRating &&
                !isLoadingNewStudentsCount &&
                !isLoadingStudentsCountByCourse &&
                !isLoadingStudentsCountByLevel
            ) ? (
                <>
                    <div className={cls.page__metrics}>
                        <MetricCard
                            title='Teacherlar soni'
                            value={`${callCount?.count || 0} ta`}
                            percentage={callCount?.countPercentage || 0}
                            icon={<MetricTimeIcon />}
                            iconBg='rgba(0, 182, 155, 0.21)'
                        />
                        <MetricCard
                            title='O`quvchilar Aktivligi'
                            value={`${studentActivity?.active || 0}`}
                            percentage={`${studentActivity?.percentage || 0}`}
                            icon={<MetricPersonsIcon />}
                            iconBg='rgba(255, 0, 0, 0.21)'
                        />
                        <MetricCard
                            title='O’rtacha oylik maoshi'
                            value={`${mentorSalary?.salaryAmount || 0}`}
                            percentage={mentorSalary?.salaryPercentage || 0}
                            icon={<MetricCashIcon />}
                            iconBg='rgba(254, 197, 61, 0.2)'
                        />
                        <MetricCard
                            title='O`rtacha Reytinggi'
                            value={<><StarIcon /> {rating?.rate || 0}</>}
                            percentage={rating?.ratePercentage || 0}
                            icon={<MetricStarsIcon />}
                            iconBg='rgba(160, 188, 241, 0.3)'
                        />
                    </div>
                    <div className={cls.page__charts}>
                        <CoursesChart
                            title='O’qidigan kurslari bo’yicha'
                            courses={studentsCountByCourse}
                        />
                        <StudentsStatusChart
                            title='O’quvchilar statusi bo’yicha'
                            status={statusUser}
                        />
                    </div>
                    <NewStudentsCountChart
                        students={newStudentsCount}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default MainMentor