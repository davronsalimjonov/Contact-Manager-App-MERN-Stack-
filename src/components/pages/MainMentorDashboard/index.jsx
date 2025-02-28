import Avatar from 'react-avatar'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { USER_ROLES } from '@/constants'
import Loader from '@/components/UI/atoms/Loader'
import { useGetUserId } from '@/hooks/useGetUser'
import { STATUS_COLORS } from '@/constants/colors'
import { useGetEmployeeById } from '@/hooks/useEmployee'
import { formatPrice, getUserFullName } from '@/utils/lib'
import CoursesChart from '@/components/UI/organisms/CoursesChart'
import StudentsCountChart from '@/components/UI/organisms/StudentsCountChart'
import ActiveStudentsCountChart from '@/components/UI/organisms/ActiveStudentsCountChart'
import { LeftArrowIcon, MetricCashIcon, MetricPersonsIcon, MetricStarsIcon, StarIcon } from '@/components/UI/atoms/icons'
import { useGetMainMentorStatistic, useGetStudentsCountByCourse, useGetStudentsCountByStatus } from '@/hooks/useStatistic'
import MetricCard from '../../UI/moleculs/MetricCard'
import cls from './MainMentorDashboard.module.scss'

const MainMentorDashboard = ({ userId, withUserInfo = false }) => {
    const navigate = useNavigate()
    const [period] = useOutletContext()
    const mentorId = userId || useGetUserId()

    const { data: mentor, isLoading: isLoadingMentor } = useGetEmployeeById(mentorId, { role: USER_ROLES.MAIN_MENTOR }, { enabled: withUserInfo })
    const { data: mainMentorStatistic, isLoading: isLoadingMainMentorStatistic } = useGetMainMentorStatistic({ mentorId, startDate: period.startDate, endDate: period.endDate })
    const { data: studentsCountByCourse, isLoading: isLoadingStudentsCountByCourse } = useGetStudentsCountByCourse({ mentorId, startDate: period.startDate, endDate: period.endDate })
    const { data: studentsCountByStatus, isLoading: isLoadingStatusUser } = useGetStudentsCountByStatus({ mentorId, startDate: period.startDate, endDate: period.endDate })

    const statusItems = studentsCountByStatus?.map((item) => ({
        label: item.status,
        value: item.count,
        color: STATUS_COLORS?.[item.status]?.color,
        backgroundColor: STATUS_COLORS?.[item.status]?.backgroundColor,
        borderColor: STATUS_COLORS?.[item.status]?.borderColor
    }))

    const isLoading = isLoadingMentor || isLoadingStudentsCountByCourse || isLoadingStatusUser || isLoadingMainMentorStatistic

    return (
        <div className={cls.page}>
            {!isLoading ? (
                <>
                    {withUserInfo && (
                        <div className={cls.page__usercard}>
                            <button onClick={() => navigate(-1)}><LeftArrowIcon /></button>
                            <Avatar src={mentor?.url} name={getUserFullName(mentor)} size="50" round />
                            <h2>{getUserFullName(mentor)}</h2>
                        </div>
                    )}
                    <div className={cls.page__metrics}>
                        <MetricCard
                            title='Faol o’quvchilar soni'
                            value={<>{mainMentorStatistic?.activeStudents || 0} ta / {mainMentorStatistic?.activeStudentsPercentage || 0} %</>}
                            icon={<MetricPersonsIcon color='rgba(0, 182, 155, 1)' />}
                            iconBg='rgba(0, 182, 155, 0.21)'
                        />
                        <MetricCard
                            title='Mentor aktivligi'
                            value={`${mainMentorStatistic?.mentorActivityPercentage || 0} %`}
                            icon={<MetricPersonsIcon color='rgba(254, 197, 61, 1)' />}
                            iconBg='rgba(254, 242, 214, 1)'
                        />
                        <MetricCard
                            title='Oylik maosh'
                            value={`${formatPrice(mainMentorStatistic?.salary || 0)} som`}
                            icon={<MetricCashIcon />}
                            iconBg='rgba(254, 197, 61, 0.2)'
                            onClick={() => navigate(`salary${withUserInfo ? `?role=${mentor?.role}` : ''}`)}
                        />
                        <MetricCard
                            title='O`rtacha Reytinggi'
                            value={<><StarIcon /> {mainMentorStatistic?.rating || 0}</>}
                            icon={<MetricStarsIcon />}
                            iconBg='rgba(160, 188, 241, 0.3)'
                        />
                    </div>
                    <div className={cls.page__charts}>
                        <CoursesChart
                            title='O’qidigan kurslari bo’yicha'
                            courses={studentsCountByCourse}
                        />
                        <StudentsCountChart
                            title='O’quvchilar statuslari bo’yicha'
                            items={statusItems}
                        />
                    </div>
                    <ActiveStudentsCountChart mentorId={mentorId} />
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default MainMentorDashboard