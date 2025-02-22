import { useOutletContext } from 'react-router-dom'
import Loader from '@/components/UI/atoms/Loader'
import { STATUS_COLORS } from '@/constants/colors'
import { formatNumber } from '@/utils/formatNumber'
import MetricCard from '@/components/UI/moleculs/MetricCard'
import { MetricPersonsIcon } from '@/components/UI/atoms/icons'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import UsersMetricCard from '@/components/UI/moleculs/UsersMetricCard'
import StudentsCountChart from '@/components/UI/organisms/StudentsCountChart'
import CourseSalesBarChart from '@/components/UI/organisms/CourseSalesBarChart'
import ActiveStudentsCountChart from '@/components/UI/organisms/ActiveStudentsCountChart'
import { useGetAcademyManagerStatistics, useGetStudentsCountByCourse, useGetStudentsCountByStatus } from '@/hooks/useStatistic'
import cls from './AcademicManager.module.scss'

const AcademicManager = () => {
  const [period] = useOutletContext()
  const { data: metrics, isLoading: isLoadingMetrics } = useGetAcademyManagerStatistics({ startDate: period.startDate, endDate: period.endDate })
  const { data: studentsCountByCourse, isLoading: isLoadingCourse } = useGetStudentsCountByCourse({ startDate: period.startDate, endDate: period.endDate })
  const { data: studentsCountByStatus, isLoading: isLoadingStatus } = useGetStudentsCountByStatus({ startDate: period.startDate, endDate: period.endDate })

  const isLoading = isLoadingMetrics || isLoadingCourse || isLoadingStatus

  const statusItems = studentsCountByStatus?.map((item) => ({
    label: item.status,
    value: item.count,
    color: STATUS_COLORS?.[item.status]?.color,
    backgroundColor: STATUS_COLORS?.[item.status]?.backgroundColor,
    borderColor: STATUS_COLORS?.[item.status]?.borderColor
  }))

  return !isLoading ? (
    <div className={cls.page}>
      <div className={cls.page__metrics}>
        <MetricCard 
          title='O’quvchilar soni'
          value={formatNumber(metrics?.studentCount)}
          iconBg='rgba(0, 182, 155, .21)'
          icon={<MetricPersonsIcon color='rgba(0, 182, 155, 1)' />}
        />
        <MetricCard
          title='Faolligi'
          value={formatNumber(metrics?.active || 0) + '%'}
          iconBg='rgba(254, 197, 61, .21)'
          icon={<MetricPersonsIcon color='rgba(255, 144, 102, 1)' />}
        />
        <MetricCard
          title='Natijalar'
          value={formatNumber(metrics?.result)}
          iconBg='rgba(255, 0, 0, .21)'
          icon={<MetricPersonsIcon color='rgba(255, 0, 0, 1)' />}
        />
        <MetricCard
          title='Qayta sotuv'
          value={`${formatNumber(metrics?.resale || 0)} ta`}
          iconBg='rgba(160, 188, 241, .3)'
          icon={<MetricPersonsIcon color='rgba(18, 86, 219, 1)' />}
        />
      </div>
      <div className={cls.page__studentCharts}>
        <CoursesChart
          title='O’qidigan kurslari bo’yicha'
          courses={studentsCountByCourse}
        />
        <StudentsCountChart
          title='O’quvchilar statuslari bo’yicha'
          items={statusItems}
        />
      </div>
      <ActiveStudentsCountChart mentorId={null} />
      <div className={cls.page__usersMetrics}>
        <UsersMetricCard
          title='Ro’yxatdan o’tgan'
          color='rgba(18, 86, 219, 1)'
          count={metrics?.registerdUser?.count}
          free={metrics?.registerdUser?.free}
          pro={metrics?.registerdUser?.pro}
        />
        <UsersMetricCard
          title='O’qiyotgan'
          color='rgba(39, 205, 2, 1)'
          count={metrics?.studyingStudent?.count}
        />
        <UsersMetricCard
          title='Bugun qo’shilganlar'
          color='rgba(249, 134, 0, 1)'
          count={metrics?.todayJoinedUsers?.count}
          free={metrics?.todayJoinedUsers?.free}
          pro={metrics?.todayJoinedUsers?.pro}
        />
        <UsersMetricCard
          title='Online'
          color='rgba(151, 71, 255, 1)'
          count={metrics?.onlineUsers?.count}
        />
      </div>
      <CourseSalesBarChart />
    </div>
  ) : (
    <Loader />
  )
}

export default AcademicManager