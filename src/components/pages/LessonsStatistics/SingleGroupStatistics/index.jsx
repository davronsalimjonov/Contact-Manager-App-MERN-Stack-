import { useOutletContext, useParams } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import BreadCrumb from '@/components/UI/moleculs/BreadCrumb';
import { useGetLessonsRateByGroup } from '@/hooks/useServiceStatistics';
import LessonsStatisticsTable from '@/components/templates/LessonsStatisticsTable';
import { PersonsGroupOutlineIcon, TeacherIcon } from '@/components/UI/atoms/icons';
import cls from './SingleGroupStatistics.module.scss';

const SingleGroupStatistics = () => {
    const [period] = useOutletContext()
    const { mentorId, groupId } = useParams()
    const { data: lessonsRate, isLoading } = useGetLessonsRateByGroup(mentorId, groupId, { startDate: period.startDate, endDate: period.endDate })

    const mentorFullname = `${lessonsRate?.[0]?.firstname} ${lessonsRate?.[0]?.lastname}`?.trim()
    const groupName = lessonsRate?.[0]?.grouptitle
    
    return !isLoading ? (
        <div className={cls.page}>
            <BreadCrumb
                className={cls.page__breadcrumb}
                items={[
                    { url: '/statistics/lessons', label: 'Servis statistikasi' },
                    { url: `/statistics/lessons/${mentorId}/${groupId}`, label: 'Dars bo’yicha statistika' },
                ]}
            />
            <div className={cls.page__layout}>
                <div className={cls.page__layout__header}>
                    <span className={cls.page__layout__header__title}>O’quvchilar baholari</span>
                    <div className={cls.page__layout__header__info}>
                        <button><TeacherIcon />{mentorFullname}</button>
                        <button><PersonsGroupOutlineIcon /> {groupName}</button>
                    </div>
                </div>
                <div className={cls.page__layout__content}>
                    <LessonsStatisticsTable items={lessonsRate} />
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default SingleGroupStatistics;