import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { debounce, getUserFullName } from '@/utils/lib';
import { useGetActiveGroups, useTransferMutation } from '@/hooks/useGroups';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import EmptyData from '../EmptyData';
import Loader from '../../atoms/Loader';
import Dialog from '../../moleculs/Dialog';
import Button from '../../atoms/Buttons/Button';
import GroupCard from '../../moleculs/GroupCard';
import FormInput from '../../moleculs/Form/FormInput';
import FormSelect from '../../moleculs/Form/FormSelect';
import ConfirmationModal from '../ConfirmationModal';
import cls from './TransferStudentModal.module.scss';

const TransferStudentModal = ({
    userIds,
    groupId,
    isOpen = false,
    onClose,
}) => {
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [filter, setFilter] = useState({ title: '', level: '' })
    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, title: '', from: '', to: '', userIds: [] })
    const { data: groups, isLoading: isLoadingGroups } = useGetActiveGroups(filter, { enabled: isOpen });
    const transferStudentMutation = useTransferMutation()
    const filteredGroups = groups?.filter(group => group.id !== groupId);

    const singleTransferConfirmTitle = `Rostan ham o\'quvchini shu guruhga transfer qilmoqchimisiz?`
    const multipleTransferConfirmTitle = `Rostan ham o\'quvchilarni shu guruhga transfer qilmoqchimisiz?`

    const handleClose = () => {
        onClose?.()
        setTimeout(() => {
            setSelectedGroup(null)
            setFilter({ title: '', level: '' })
        }, 300)
    }

    const handleSubmitForm = () => {
        setConfirmationModal({
            isOpen: true,
            title: userIds.length > 1 ? multipleTransferConfirmTitle : singleTransferConfirmTitle,
            from: groupId,
            to: selectedGroup,
            userIds
        })
        handleClose?.()
    }

    const handleTransferStudent = async () => {
        const transferData = { from: confirmationModal?.from, to: confirmationModal?.to, studentIds: confirmationModal?.userIds }
        await transferStudentMutation.mutateAsync(transferData, {
            onSuccess: () => toast.success('O\'quvchi transfer qilindi'),
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    useEffect(() => {
        if (!filteredGroups?.some(group => group.id === selectedGroup)) setSelectedGroup(null)
    }, [filteredGroups])

    return (
        <>
            <ConfirmationModal
                title={confirmationModal?.title || singleTransferConfirmTitle}
                isOpen={confirmationModal?.isOpen}
                onClose={() => setConfirmationModal({ isOpen: false, userIds: '', from: '', to: '', title: '' })}
                onConfirm={handleTransferStudent}
            />
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
                            isclearable
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
                            <Button onClick={handleSubmitForm} disabled={!selectedGroup}>Transfer qilish</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default TransferStudentModal;