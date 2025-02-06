import { useState } from 'react';
import Avatar from 'react-avatar';
import { getUserFullName } from '@/utils/lib';
import { useGetGroupInfo, useUpdateGroupMutation } from '@/hooks/useGroups';
import Loader from '../../atoms/Loader';
import Button from '../../atoms/Buttons/Button';
import GroupFormModal from '../GroupFormModal';
import { ArrowRightIcon, EditIcon, PersonsGroupIcon } from '../../atoms/icons';
import cls from './GroupInfoCard.module.scss';

const GroupInfoCard = ({
    groupId,
    onClickCreateSchedule
}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const updateGroupMutation = useUpdateGroupMutation()
    const { data: group, isLoading } = useGetGroupInfo(groupId)

    const hasSchedule = group?.lessonSchedules?.length > 0
    const isCollecting = group?.status === 'collecting'
    const mainMentorFullName = getUserFullName(group?.academyMentor)
    const mainMentorAvatar = group?.academyMentor?.url
    const callMentorFullName = getUserFullName(group?.callMentor)
    const callMentorAvatar = group?.callMentor?.url

    const defaultFormValues = {
        title: group?.title,
        academyMentor: group?.academyMentor?.id,
        callMentor: group?.callMentor?.id,
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

    return (
        <div className={cls.card}>
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
                            <div className={cls.card__mentors__item}>
                                <Avatar
                                    round
                                    size='28'
                                    src={callMentorAvatar}
                                    name={callMentorFullName}
                                    className={cls.card__mentors__item__avatar}
                                />
                                <span className={cls.card__mentors__item__role}>Nazoratchi mentor</span>
                                <span className={cls.card__mentors__item__name}>{callMentorFullName}</span>
                            </div>
                        </div>
                        {isCollecting && <Button>Boshlash</Button>}
                    </div>
                </>
            )}
        </div>
    );
}

export default GroupInfoCard;