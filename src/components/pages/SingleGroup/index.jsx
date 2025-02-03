import { useNavigate, useParams } from 'react-router-dom';
import { useGetGroupInfo, useGetGroupStudents } from '@/hooks/useGroups';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import GroupInfoCard from '@/components/UI/organisms/GroupInfoCard';
import GroupStudentsTable from '@/components/templates/GroupStudentsTable';
import cls from './SingleGroup.module.scss';
import { getUserFullName } from '@/utils/lib';
import { useState } from 'react';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';

const SingleGroup = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const [pagination, setPagination] = useState({ page: 0, limit: 12 })
    const { data: groupInfo, isLoading } = useGetGroupInfo(groupId)
    const { data: groupStudents, isLoading: isLoadingStudents } = useGetGroupStudents(groupId, { page: pagination.page + 1, limit: pagination.limit })

    return (
        <div className={cls.page}>
            {isLoading ? <Loader /> : (
                <>
                    <GroupInfoCard
                        title={groupInfo?.title}
                        hasSchedule={groupInfo?.lessonSchedules?.length > 0}
                        mainMentorFullName={getUserFullName(groupInfo?.academyMentor)}
                        mainMentorAvatar={groupInfo?.academyMentor?.url}
                        callMentorFullName={getUserFullName(groupInfo?.callMentor)}
                        callMentorAvatar={groupInfo?.callMentor?.url}
                        onClickCreateSchedule={() => navigate('lesson-schedule')}
                    />
                    {isLoadingStudents ? (
                        <Loader />
                    ) : (
                        groupStudents?.items?.length > 0 ? (
                            <>
                                <GroupStudentsTable students={groupStudents?.items} />
                                <Pagination
                                    initialPage={pagination.page}
                                    pageCount={groupStudents?.meta?.totalPages}
                                    onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
                                />
                            </>
                        ) : (
                            <EmptyData />
                        )
                    )}
                </>
            )}
        </div>
    );
}

export default SingleGroup;