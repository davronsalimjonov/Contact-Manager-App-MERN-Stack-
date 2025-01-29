import { useState } from 'react';
import { getUserFullName } from '@/utils/lib';
import Tabs from '@/components/UI/moleculs/Tabs';
import { useGetGroupsByLevel } from '@/hooks/useGroups';
import GroupCard from '@/components/UI/moleculs/GroupCard';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './Groups.module.scss';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import Loader from '@/components/UI/atoms/Loader';

const Groups = () => {
    const [pagnination, setPagination] = useState({ page: 0, limit: 10 })
    const [activeLevel, setActiveLevel] = useState('A1')
    const { data: groups, isLoading } = useGetGroupsByLevel(activeLevel, { page: pagnination.page + 1, limit: 1 })

    return (
        <div className={cls.groups}>
            <Tabs
                className={cls.groups__tabs}
                activeTabClassName={cls.groups__tabs__active}
                onChange={setActiveLevel}
                options={[
                    { value: 'A1', label: 'A1' },
                    { value: 'A2', label: 'A2' },
                    { value: 'B1', label: 'B1' },
                    { value: 'B2', label: 'B2' },
                    { value: 'C1', label: 'C1' },
                    { value: 'C2', label: 'C2' },
                ]}
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
        </div>
    );
}

export default Groups;