import { useOutletContext } from 'react-router-dom'
import Loader from '@/components/UI/atoms/Loader'
import useGetStatistic from '@/hooks/useGetStatistic'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import NewStudentsCountChart from '@/components/UI/organisms/NewStudentsCountChart'
import { MetricPersonBlue, MetricPersonGreen, MetricPersonOrange, MetricPersonsIcon } from '@/components/UI/atoms/icons'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './AcademicManager.module.scss'
import MentorMetricCard from '@/components/UI/moleculs/MentorMetricCard'
import BarChart from '@/components/UI/organisms/CourseSalesChart'
import StudentsStatusChart from '@/components/UI/organisms/StudentsStatusChart'

const AcademicManager = () => {
    const [period] = useOutletContext()
    const {
        callCount: { data: callCount, isLoading: isLoadingCallCount },
        rating: { data: rating, isLoading: isLoadingRating },
        studentsCountByCourse: { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse },
        newStudentsCount: { data: newStudentsCount, isLoading: isLoadingNewStudentsCount },
        allStudentsCount: { data: allStudentsCount, isLoading: isLoadingAllStudentsCount},
        todayProUsers: { data: todayProUsers, isLoading: isLoadingTodayProUsers},
        todayOnlineUsers: {data: todayOnlineUsers, isLoading: isLoadingTodayOnlineUsers},
        statusUser: {data: statusUser, isLoading: isLoadingStatusUser}
    } = useGetStatistic({ startDate: period.startDate, endDate: period.endDate })

    return (
        <div className={cls.page}>
            {(
                !isLoadingStatusUser &&
                !isLoadingTodayProUsers &&
                !isLoadingAllStudentsCount &&
                !isLoadingNewStudentsCount &&
                !isLoadingStudentsCountByCourse &&
                !isLoadingRating &&
                !isLoadingCallCount &&
                !isLoadingTodayOnlineUsers 
            ) ? (
                <>
                    <div className={cls.page__metrics}>
                        <MetricCard
                            title="O'quvchilar Soni"
                            value={`${allStudentsCount?.pro || 0}`}
                            percentage={callCount?.countPercentage || 0}
                            icon={<MetricPersonGreen />}
                            iconBg='rgba(0, 182, 155, 0.21)'
                        />
                        <MetricCard
                            title='Faolligi'
                            value={`${rating?.rate || 0}%`}
                            percentage={rating?.ratePercentage || 0}
                            icon={<MetricPersonOrange />}
                            iconBg='rgba(254, 197, 61, 0.2)'
                        />
                        <MetricCard
                            title='Natijalar'
                            value={`2300`}
                            percentage={callCount?.durationPercentage || 0}
                            icon={<MetricPersonsIcon />}
                            iconBg='rgba(255, 0, 0, 0.2)'
                            />
                        <MetricCard
                            title='Qayta Sotuv'
                            value={'Tez orada qo`shiladi'}
                            percentage={8.5}
                            icon={<MetricPersonBlue />}
                            iconBg='rgba(160, 188, 241, 0.2)'
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
                    <div className={cls.page__mentorMetricCardParent}>
                        <MentorMetricCard
                            title="Ro'yxatdan O'tganlar"
                            count={allStudentsCount?.all}
                            free={allStudentsCount?.all - allStudentsCount?.pro}
                            pro={allStudentsCount?.pro}
                            countColor='#1256DB'
                        />
                        <MentorMetricCard
                            title="O'qiyotgan"
                            count={allStudentsCount?.pro}
                            free={allStudentsCount?.pro - allStudentsCount?.pro}
                            pro={allStudentsCount?.pro}
                            countColor='#27CD02'
                        />
                        <MentorMetricCard
                            title="Yangi Qo'shilganlar"
                            count={todayProUsers?.all}
                            free={todayProUsers?.all - todayProUsers?.pro}
                            pro={todayProUsers?.pro}
                            countColor='#F98600'
                        />
                        <MentorMetricCard
                            title="Online"
                            count={todayOnlineUsers?.count}
                            free={todayOnlineUsers?.count}
                            pro={todayOnlineUsers?.count}
                            countColor='#9747FF'
                        />
                    </div>
                    <div>
                        <BarChart />
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default AcademicManager