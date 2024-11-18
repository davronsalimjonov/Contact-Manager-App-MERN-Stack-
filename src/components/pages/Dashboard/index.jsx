import { useOutletContext } from 'react-router-dom'
import useGetStatistic from '@/hooks/useGetStatistic'
import { convertSecondsToTimeFormat } from '@/utils/lib'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import StudentsLevelChart from '@/components/UI/organisms/StudentsLevelChart'
import NewStudentsCountChart from '@/components/UI/organisms/NewStudentsCountChart'
import { MetricCashIcon, MetricPersonsIcon, MetricStarsIcon, MetricTimeIcon, StarIcon } from '@/components/UI/atoms/icons'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './Dashboard.module.scss'
import Loader from '@/components/UI/atoms/Loader'

const Dashboard = () => {
    const [period] = useOutletContext()
    const {
        callCount: { data: callCount, isLoading: isLoadingCallCount },
        rating: { data: rating, isLoading: isLoadingRating },
        studentsCountByCourse: { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse },
        studentsCountByLevel: { data: studentsCountByLevel, isLoading: isLoadingStudentsCountByLevel },
        newStudentsCount: { data: newStudentsCount, isLoading: isLoadingNewStudentsCount }
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
                            title='Qo’ng’iroqlar soni'
                            value={`${callCount?.count || 0} ta`}
                            percentage={callCount?.countPercentage || 0}
                            icon={<MetricTimeIcon />}
                            iconBg='rgba(0, 182, 155, 0.21)'
                        />
                        <MetricCard
                            title='Reytinggi'
                            value={<><StarIcon /> {rating?.rate || 0}</>}
                            percentage={rating?.ratePercentage || 0}
                            icon={<MetricStarsIcon />}
                            iconBg='rgba(160, 188, 241, 0.3)'
                        />
                        <MetricCard
                            title='Qo’ng’iroq davomiyligi'
                            value={`${callCount?.duration ? convertSecondsToTimeFormat(callCount?.duration) : 0} s`}
                            percentage={callCount?.durationPercentage || 0}
                            icon={<MetricCashIcon />}
                            iconBg='rgba(254, 197, 61, 0.2)'
                        />
                        <MetricCard
                            title='Task bajarish tezligi'
                            value={'01:24 s'}
                            percentage={8.5}
                            icon={<MetricPersonsIcon />}
                            iconBg='rgba(255, 0, 0, 0.21)'
                        />
                    </div>
                    <div className={cls.page__charts}>
                        <CoursesChart
                            title='O’qidigan kurslari bo’yicha'
                            courses={studentsCountByCourse}
                        />
                        <StudentsLevelChart
                            title='O’quvchilar darajasi bo’yicha'
                            levels={studentsCountByLevel}
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

export default Dashboard