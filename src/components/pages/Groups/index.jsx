import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { debounce, getUserFullName } from '@/utils/lib';
import { GROUP_STATUS } from '@/constants/enum';
import Tabs from '@/components/UI/moleculs/Tabs';
import Loader from '@/components/UI/atoms/Loader';
import Input from '@/components/UI/atoms/Form/Input';
import useSessionState from '@/hooks/useSessionState';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Select from '@/components/UI/atoms/Form/Select';
import { useGetMentorsForOptions } from '@/hooks/useMentor';
import Button from '@/components/UI/atoms/Buttons/Button';
import GroupCard from '@/components/UI/moleculs/GroupCard';
import EmptyData from '@/components/UI/organisms/EmptyData';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import GroupFormModal from '@/components/UI/organisms/GroupFormModal';
import ConfirmationModal from '@/components/UI/organisms/ConfirmationModal';
import { ENGLISH_LEVEL_OPTIONS, GROUP_STATUS_OPTIONS } from '@/constants/form';
import { useCreateGroupMutation, useGetGroupsByLevel, useUpdateGroupMutation } from '@/hooks/useGroups';
import cls from './Groups.module.scss';

const Groups = () => {
    const navigate = useNavigate()
    const [pagnination, setPagination] = useSessionState('groups-pagination', { page: 0, limit: 12 })
    const [filter, setFilter] = useSessionState('groups-filter', { mentorId: null, status: null, name: null, level: ENGLISH_LEVEL_OPTIONS?.[0]?.value })
    const [isOpenCreateGroup, setIsOpenCreateGroup] = useState(false)
    const [confirmStartGroup, setConfirmStartGroup] = useState({ isOpen: false, groupId: null })
    const { data: groups, isLoading } = useGetGroupsByLevel(filter.level, { ...filter, page: pagnination.page + 1, limit: pagnination.limit })
    const { mainMentors: { data: mentors } } = useGetMentorsForOptions()
    const createGroupMutation = useCreateGroupMutation()
    const updateGroupMutation = useUpdateGroupMutation()

    const mentorOptions = mentors?.map(mentor => ({ label: getUserFullName(mentor), value: mentor.id }))

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
        setFilter(state => ({ ...state, level }))
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
            <div className={cls.groups__filter}>
                <Select
                    placeholder='Mentor'
                    className={cls.groups__filter__select}
                    options={mentorOptions}
                    isclearable
                    defaultValue={mentorOptions?.find(option => option?.value === filter?.mentor)}
                    onChange={(option) => setFilter({ ...filter, mentor: option?.value })}
                />
                <Select
                    placeholder='Status'
                    className={cls.groups__filter__select}
                    options={GROUP_STATUS_OPTIONS}
                    isclearable
                    defaultValue={GROUP_STATUS_OPTIONS?.find(option => option?.value === filter?.status)}
                    onChange={(option) => setFilter({ ...filter, status: option?.value })}
                />
                <Input
                    placeholder='Guruh nomi'
                    className={cls.groups__filter__input}
                    defaultValue={filter?.title}
                    onChange={debounce((e) => setFilter({ ...filter, title: e.target.value?.trim() }))}
                />
                <Button onClick={() => setIsOpenCreateGroup(true)}>
                    <PlusIcon />
                    Qo'shish
                </Button>
            </div>
            <Tabs
                className={cls.groups__tabs}
                activeTabClassName={cls.groups__tabs__active}
                onChange={handleChangeLevel}
                defaultValue={filter?.level}
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