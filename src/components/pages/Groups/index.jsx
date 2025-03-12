import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import { GROUP_STATUS } from '@/constants/enum';
import Tabs from '@/components/UI/moleculs/Tabs';
import Loader from '@/components/UI/atoms/Loader';
import useSessionState from '@/hooks/useSessionState';
import { PlusIcon } from '@/components/UI/atoms/icons';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import Button from '@/components/UI/atoms/Buttons/Button';
import GroupCard from '@/components/UI/moleculs/GroupCard';
import EmptyData from '@/components/UI/organisms/EmptyData';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import GroupFormModal from '@/components/UI/organisms/GroupFormModal';
import ConfirmationModal from '@/components/UI/organisms/ConfirmationModal';
import { useCreateGroupMutation, useGetGroupsByLevel, useUpdateGroupMutation } from '@/hooks/useGroups';
import cls from './Groups.module.scss';

const Groups = () => {
    const navigate = useNavigate()
    const [activeLevel, setActiveLevel] = useSessionState('groups-active-level', 'A1')
    const [pagnination, setPagination] = useSessionState('groups-pagination', { page: 0, limit: 12 })
    const [isOpenCreateGroup, setIsOpenCreateGroup] = useState(false)
    const [confirmStartGroup, setConfirmStartGroup] = useState({ isOpen: false, groupId: null })
    const { data: groups, isLoading } = useGetGroupsByLevel(activeLevel, { page: pagnination.page + 1, limit: pagnination.limit })
    const createGroupMutation = useCreateGroupMutation()
    const updateGroupMutation = useUpdateGroupMutation()

    const handleCreateGroup = async (data) => {
        await createGroupMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success("Gurux Yaratildi!")
                setIsOpenCreateGroup(false)
            },
            onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
        })
    }

    const handleStartGroup = async (groupId) => {
        await updateGroupMutation.mutateAsync({ id: groupId, status: GROUP_STATUS.ACTIVE }, {
            onSuccess: () => toast.success("Gurux active holatga o’tildi!"),
            onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
        })
    }

    const handleChangeLevel = (level) => {
        setActiveLevel(level)
        setPagination(state => ({ ...state, page: 0 }))
    }

    return (
        <div className={cls.groups}>
            <ConfirmationModal
                isOpen={confirmStartGroup.isOpen}
                title='Ushbu guruhni active holatga o’tkazmoqchimisiz?'
                onClose={() => setConfirmStartGroup({ isOpen: false, groupId: null })}
                onConfirm={() => handleStartGroup(confirmStartGroup.groupId)}
            />
            <GroupFormModal
                isOpen={isOpenCreateGroup}
                onClose={() => setIsOpenCreateGroup(false)}
                onSubmit={handleCreateGroup}
            />
            <div className={cls.groups__addGroup}>
                <Button onClick={() => setIsOpenCreateGroup(true)}>
                    <PlusIcon />
                    Qo'shish
                </Button>
            </div>
            <Tabs
                className={cls.groups__tabs}
                activeTabClassName={cls.groups__tabs__active}
                onChange={handleChangeLevel}
                defaultValue={activeLevel}
                options={ENGLISH_LEVEL_OPTIONS}
            />
            {!isLoading ? (
                groups?.items?.length > 0 ? (
                    <div className={cls.groups__cards}>
                        {groups?.items.map(group => (
                            <GroupCard
                                key={group.id}
                                name={group.title}
                                schedules={group.lessonSchedules}
                                studentsCount={group.studentsCount}
                                mainMentorFullName={getUserFullName(group.academyMentor)}
                                mainMentorAvatar={group.academyMentor?.url}
                                isCollecting={group.status === 'collecting'}
                                isClosed={group.status === 'closed'}
                                showStartButton
                                onClickStart={() => setConfirmStartGroup({ isOpen: true, groupId: group.id })}
                                onClick={() => navigate(group.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyData />
                )
            ) : (
                <Loader />
            )}
            {groups?.items?.length > 0 && (
                <Pagination
                    initialPage={pagnination.page}
                    page={pagnination.page}
                    pageCount={groups?.meta?.totalPages}
                    onPageChange={({ selected: page }) => setPagination({ ...pagnination, page })}
                />
            )}
        </div>
    );
}

export default Groups;