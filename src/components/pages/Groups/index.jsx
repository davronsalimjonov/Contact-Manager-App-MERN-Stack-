import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import Tabs from '@/components/UI/moleculs/Tabs';
import Loader from '@/components/UI/atoms/Loader';
import { PlusIcon } from '@/components/UI/atoms/icons';
import { ENGLISH_LEVEL_OPTIONS } from '@/constants/form';
import Button from '@/components/UI/atoms/Buttons/Button';
import GroupCard from '@/components/UI/moleculs/GroupCard';
import EmptyData from '@/components/UI/organisms/EmptyData';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import { useCreateGroupMutation, useGetGroupsByLevel } from '@/hooks/useGroups';
import CreateGroupForGroupsForm from '@/components/UI/organisms/CreateGroupForGroupsForm';
import cls from './Groups.module.scss';

const Groups = () => {
    const navigate = useNavigate()
    const [pagnination, setPagination] = useState({ page: 0, limit: 12 })
    const [activeLevel, setActiveLevel] = useState('A1')
    const { data: groups, isLoading } = useGetGroupsByLevel(activeLevel, { page: pagnination.page + 1, limit: 12 })
    const [isOpen, setIsOpen] = useState(false)
    const { createGroupMutation } = useCreateGroupMutation()

    const handleCreateGroup = async (data) => {
        await createGroupMutation.mutateAsync(data, {
            onSuccess: () => {
                toast.success("Gurux Yaratildi!")
                setIsOpen(false)
            },
            onError: (err) => toast.error(err?.response?.data?.message || "Xatolik Yuz Berdi!")
        })
    }

    return (
        <div className={cls.groups}>
            <div className={cls.groups__addGroup}>
                <Button onClick={() => setIsOpen(true)}>
                    <PlusIcon />
                    Qo'shish
                </Button>
            </div>
            <Tabs
                className={cls.groups__tabs}
                activeTabClassName={cls.groups__tabs__active}
                onChange={setActiveLevel}
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
                                callMentorFullName={getUserFullName(group.callMentor)}
                                callMentorAvatar={group.callMentor?.url}
                                isCollecting={group.status === 'collecting'}
                                isClosed={group.status === 'closed'}
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
                    pageCount={groups?.meta?.totalPages}
                    onPageChange={({ selected: page }) => setPagination({ ...pagnination, page })}
                />
            )}
            <CreateGroupForGroupsForm
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleCreateGroup}
            />
        </div>
    );
}

export default Groups;