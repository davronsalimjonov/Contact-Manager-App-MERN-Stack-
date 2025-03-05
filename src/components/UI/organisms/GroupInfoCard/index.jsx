import { useState } from 'react';
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';
import { getUserFullName } from '@/utils/lib';
import { GROUP_STATUS } from '@/constants/enum';
import { useGetGroupInfo, useUpdateGroupMutation } from '@/hooks/useGroups';
import Loader from '../../atoms/Loader';
import GroupFormModal from '../GroupFormModal';
import Button from '../../atoms/Buttons/Button';
import ConfirmationModal from '../ConfirmationModal';
import { ArrowRightIcon, EditIcon, PersonsGroupIcon } from '../../atoms/icons';
import cls from './GroupInfoCard.module.scss';

const GroupInfoCard = ({
    groupId,
    onClickCreateSchedule
}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [confirmChangeStatus, setConfirmChangeStatus] = useState({ isOpen: false, status: null });
    const updateGroupMutation = useUpdateGroupMutation()
    const { data: group, isLoading } = useGetGroupInfo(groupId)

    const hasSchedule = group?.lessonSchedules?.length > 0
    const isCollecting = group?.status === GROUP_STATUS.COLLECTING
    const isActive = group?.status === GROUP_STATUS.ACTIVE
    const mainMentorFullName = getUserFullName(group?.academyMentor)
    const mainMentorAvatar = group?.academyMentor?.url
    const confirmModalTitle = confirmChangeStatus.status === GROUP_STATUS.ACTIVE ? 'Ushbu guruhni active holatga o’tkazmoqchimisiz?' : 'Ushbu guruhni yopmoqchimisiz?'

    const defaultFormValues = {
        title: group?.title,
        academyMentor: group?.academyMentor?.id,
    }

    const handleSubmit = async (data) => {
        data.id = groupId
        await updateGroupMutation.mutateAsync(data, {
            onSuccess: () => {
                setIsOpenForm(false)
                toast.success('Guruh ma\'lumotlari o\'zgartirildi')
            },
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    const handleStartGroup = async (status) => {
        const groupId = group?.id
        const successMessage = status === GROUP_STATUS.ACTIVE ? 'Guruh muvaffaqiyatli active holatga o’tkazildi' : 'Guruh muvaffaqiyatli yopildi'
        await updateGroupMutation.mutateAsync({ id: groupId, status }, {
            onSuccess: () => toast.success(successMessage),
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <div className={cls.card}>
            <ConfirmationModal
                title={confirmModalTitle}
                isOpen={confirmChangeStatus.isOpen}
                onClose={() => setConfirmChangeStatus(state => ({...state, isOpen: false }))}
                onConfirm={() => handleStartGroup(confirmChangeStatus.status)}
            />
            {isLoading ? <Loader size={100} /> : (
                <>
                    <GroupFormModal
                        isEdit
                        isOpen={isOpenForm}
                        onSubmit={handleSubmit}
                        defaultValues={defaultFormValues}
                        onClose={() => setIsOpenForm(false)}
                    />
                    <div className={cls.card__header}>
                        <div className={cls.card__header__title}>
                            <PersonsGroupIcon />
                            <span className={cls.card__header__title}>{group?.title} guruh</span>
                        </div>
                        <button className={cls.card__header__button} onClick={() => setIsOpenForm(true)}><EditIcon /></button>
                    </div>
                    {hasSchedule ? (
                        <Button onClick={onClickCreateSchedule} className={cls.card__outline}>Dars jadval <ArrowRightIcon /></Button>
                    ) : (
                        <Button onClick={onClickCreateSchedule}>Dars jadval yaratish</Button>
                    )}
                    <div className={cls.card__info}>
                        <div className={cls.card__mentors}>
                            <div className={cls.card__mentors__item}>
                                <Avatar
                                    round
                                    size='28'
                                    name={mainMentorFullName}
                                    src={mainMentorAvatar}
                                    className={cls.card__mentors__item__avatar}
                                />
                                <span className={cls.card__mentors__item__role}>Asosiy mentor</span>
                                <span className={cls.card__mentors__item__name}>{mainMentorFullName}</span>
                            </div>
                        </div>
                        {isCollecting && <Button onClick={() => setConfirmChangeStatus({ isOpen: true, status: GROUP_STATUS.ACTIVE })}>Boshlash</Button>}
                        {isActive && <Button onClick={() => setConfirmChangeStatus({ isOpen: true, status: GROUP_STATUS.CLOSED })}>Tugatish</Button>}
                    </div>
                </>
            )}
        </div>
    );
}

export default GroupInfoCard;