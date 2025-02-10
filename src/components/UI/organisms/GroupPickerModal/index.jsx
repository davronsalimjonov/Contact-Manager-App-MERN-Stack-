import { getUserFullName } from '@/utils/lib';
import { useGetActiveGroups } from '@/hooks/useGroups';
import EmptyData from '../EmptyData';
import Loader from '../../atoms/Loader';
import Dialog from '../../moleculs/Dialog';
import GroupCard from '../../moleculs/GroupCard';
import cls from './GroupPickerModal.module.scss';

const GroupPickerModal = ({
    level,
    isOpen,
    onClose,
    onChooseGroup
}) => {
    const { data: groups, isLoadingGroups } = useGetActiveGroups({ level }, {enabled: !!level})

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className={cls.wrapper}>
                {isLoadingGroups ? <Loader /> : (
                    groups?.length > 0 ? (
                        <div className={cls.modal}>
                            {groups?.map(group => (
                                <GroupCard
                                    key={group.id}
                                    name={group.title}
                                    studentsCount={group.studentsCount}
                                    mainMentorFullName={getUserFullName(group.academyMentor)}
                                    callMentorFullName={getUserFullName(group.callMentor)}
                                    isCollecting={group.status === 'collecting'}
                                    schedules={group.lessonSchedules}
                                    onClick={() => onChooseGroup(group)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyData text='Bu daraja uchun hech qanday guruhlar mavjud emas' />
                    )
                )}
            </div>
        </Dialog>
    );
}

export default GroupPickerModal;