import { useEffect, useState } from 'react';
import { debounce, getUserFullName } from '@/utils/lib';
import { useGetActiveGroups } from '@/hooks/useGroups';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import EmptyData from '../EmptyData';
import Loader from '../../atoms/Loader';
import Dialog from '../../moleculs/Dialog';
import Button from '../../atoms/Buttons/Button';
import GroupCard from '../../moleculs/GroupCard';
import FormInput from '../../moleculs/Form/FormInput';
import FormSelect from '../../moleculs/Form/FormSelect';
import cls from './TransferStudentModal.module.scss';

const TransferStudentModal = ({
    initialGroupId,
    isOpen = true,
    onClose,
    onSubmit
}) => {
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [filter, setFilter] = useState({ title: '', level: '' })
    const { data: groups, isLoading: isLoadingGroups } = useGetActiveGroups(filter);
    const filteredGroups = groups?.filter(group => group.id !== initialGroupId);

    const handleClose = () => {
        onClose?.()
        setTimeout(() => {
            setSelectedGroup(null)
            setFilter({ title: '', level: '' })
        }, 300)
    }

    useEffect(() => {
        if (!filteredGroups?.some(group => group.id === selectedGroup)) setSelectedGroup(null)
    }, [filteredGroups])

    return (
        <Dialog isOpen={isOpen} onClose={handleClose}>
            <div className={cls.form}>
                <h2 className={cls.form__title}>Transfer Student</h2>
                <div className={cls.form__content}>
                    <FormInput
                        label='Title'
                        placeholder='Guruh nomi'
                        onChange={debounce(e => setFilter(state => ({ ...state, title: e.target.value?.trim() })), 300)}
                    />
                    <FormSelect
                        label='Level tanlang'
                        placeholder='Level tanlang'
                        options={ENGLISH_LEVEL_OPTIONS}
                        onChange={(level) => setFilter(state => ({ ...state, level: level?.value }))}
                        isClearable
                    />
                    <div className={cls.form__content__groups}>
                        {isLoadingGroups ? (
                            <Loader />
                        ) : (
                            filteredGroups?.length > 0 ? (
                                <div className={cls.form__content__cards}>
                                    {filteredGroups?.map(group => (
                                        <GroupCard
                                            key={group.id}
                                            name={group.title}
                                            studentsCount={group.studentsCount}
                                            mainMentorFullName={getUserFullName(group.academyMentor)}
                                            mainMentorAvatar={group.academyMentor?.url}
                                            callMentorFullName={getUserFullName(group.callMentor)}
                                            callMentorAvatar={group.callMentor?.url}
                                            isCollecting={group.status === 'collecting'}
                                            schedules={group.lessonSchedules}
                                            isSelected={selectedGroup === group?.id}
                                            onClick={() => setSelectedGroup(group?.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyData text='Guruhlar mavjud emas' />
                            )
                        )}
                    </div>
                    <div className={cls.form__content__btn}>
                        <Button className={cls.form__content__btn__reject} onClick={handleClose}>Bekor qilish</Button>
                        <Button onClick={() => (onSubmit?.(selectedGroup), handleClose?.())} disabled={!selectedGroup}>Transfer qilish</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default TransferStudentModal;