import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';
import BreadCrumb from '@/components/UI/moleculs/BreadCrumb';
import { useOutletContext, useParams } from 'react-router-dom';
import { useGetLessonRate } from '@/hooks/useServiceStatistics';
import { PersonsGroupOutlineIcon, TeacherIcon } from '@/components/UI/atoms/icons';
import ServiceRatePreviewModal from '@/components/UI/organisms/ServiceRatePreviewModal';
import LessonStudentsFeedbackTable from '@/components/templates/LessonStudentsFeedbackTable';
import cls from './LessonStatistics.module.scss';

const LessonStatistics = () => {
    const { mentorId, groupId, lessonId } = useParams()
    const [period] = useOutletContext()
    const [previewRate, setPreviewRate] = useState({ isOpen: false })
    const { data: lessonRate, isLoading } = useGetLessonRate(lessonId, { startDate: period.startDate, endDate: period.endDate })

    const lesson = lessonRate?.[0]
    const lessonTitle = lesson?.title
    const groupName = lesson?.grouptitle
    const mentorFullname = `${lesson?.mentorfirstname} ${lesson?.mentorlastname}`?.trim()

    return !isLoading ? (
        <div className={cls.page}>
            <ServiceRatePreviewModal
                isOpen={previewRate.isOpen}
                onClose={() => setPreviewRate(state => ({ ...state, isOpen: false }))}
                avatar={previewRate?.studenturl}
                fullName={`${previewRate?.studentfirstname} ${previewRate?.studentlastname}`.trim()}
                rating={previewRate?.rate}
                comments={previewRate?.comments}
            />
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
                        <button><TeacherIcon /> {mentorFullname}</button>
                        <button><PersonsGroupOutlineIcon /> {groupName}</button>
                        <button>{lessonTitle}</button>
                    </div>
                </div>
                <div className={cls.page__layout__content}>
                    <LessonStudentsFeedbackTable
                        items={lessonRate}
                        onClick={item => setPreviewRate(({ ...item, isOpen: true }))}
                    />
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}

export default LessonStatistics;