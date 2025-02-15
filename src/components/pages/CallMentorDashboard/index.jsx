import { useOutletContext } from 'react-router-dom'
import { formatPrice } from '@/utils/lib'
import Loader from '@/components/UI/atoms/Loader'
import { useGetUserId } from '@/hooks/useGetUser'
import { LEVEL_COLORS } from '@/constants/colors'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import StudentsCountChart from '@/components/UI/organisms/StudentsCountChart'
import NewStudentsCountChart from '@/components/UI/organisms/ActiveStudentsCountChart'
import { MetricCashIcon, MetricPersonsIcon, MetricStarsIcon, MetricTimeIcon } from '@/components/UI/atoms/icons'
import { useGetCallMentorStatistic, useGetStudentsCountByCourse, useGetStudentsCountByLevel } from '@/hooks/useStatistic'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './CallMentorDashboard.module.scss'

const CallMentorDashboard = () => {
    const mentorId = useGetUserId()
    const [period] = useOutletContext()

    const { data: callMentorStatistic, isLoading: isLoadingCallMentorStatistic } = useGetCallMentorStatistic({ mentorId, startDate: period.startDate, endDate: period.endDate })
    const { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse } = useGetStudentsCountByCourse({ mentorId, startDate: period.startDate, endDate: period.endDate })
    const { data: studentsCountByLevel, isLoading: isLoadingStudentsCountByLevel } = useGetStudentsCountByLevel({ mentorId, startDate: period.startDate, endDate: period.endDate })

    const levelItems = studentsCountByLevel?.map((item) => ({ 
        label: item.level, 
        value: item.count, 
        color: LEVEL_COLORS?.[item.level]?.color, 
        backgroundColor: LEVEL_COLORS?.[item.level]?.backgroundColor,
        borderColor: LEVEL_COLORS?.[item.level]?.borderColor
    }))

    const isLoading = isLoadingCallMentorStatistic || isLoadingStudentsCountByCourse || isLoadingStudentsCountByLevel

    return (
        <div className={cls.page}>
            {!isLoading ? (
                <>
                    <div className={cls.page__metrics}>
                        <MetricCard
                            title='Qo’ng’iroqlar soni'
                            value={<><span className={cls.page__metrics__value}>{(callMentorStatistic?.calls || 0).split('/')?.[0]}</span>/{(callMentorStatistic?.calls || 0).split('/')?.[1]} ta</>}
                            icon={<MetricTimeIcon />}
                            iconBg='rgba(0, 182, 155, 0.21)'
                        />
                        <MetricCard
                            title='Reytinggi'
                            // value={<><StarIcon /> {callMentorStatistic?.rating || 0}</>}
                            value='Tez kunda'
                            icon={<MetricStarsIcon />}
                            iconBg='rgba(160, 188, 241, 0.3)'
                        />
                        <MetricCard
                            title='Oylik maosh'
                            value={`${formatPrice(callMentorStatistic?.salary || 0)} UZS`}
                            icon={<MetricCashIcon />}
                            iconBg='rgba(254, 197, 61, 0.2)'
                        />
                        <MetricCard
                            title='Adaptatsiya soni'
                            value={`${callMentorStatistic?.adaptationCount || 0} ta`}
                            icon={<MetricPersonsIcon />}
                            iconBg='rgba(255, 0, 0, 0.21)'
                        />
                    </div>
                    <div className={cls.page__charts}>
                        <CoursesChart
                            title='O’qiydigan kurslari bo’yicha'
                            courses={studentsCountByCourse}
                        />
                        <StudentsCountChart
                            title='O’quvchilar darajasi bo’yicha'
                            items={levelItems}
                        />
                    </div>
                    <NewStudentsCountChart mentorId={mentorId} />
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default CallMentorDashboard