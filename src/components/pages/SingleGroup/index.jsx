import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@/components/UI/atoms/Loader';
import { useGetGroupInfo, useGetGroupStudents } from '@/hooks/useGroups';
import EmptyData from '@/components/UI/organisms/EmptyData';
import Pagination from '@/components/UI/moleculs/CustomPagination';
import GroupInfoCard from '@/components/UI/organisms/GroupInfoCard';
import GroupStudentsTable from '@/components/templates/GroupStudentsTable';
import cls from './SingleGroup.module.scss';

const SingleGroup = () => {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const [pagination, setPagination] = useState({ page: 0, limit: 12 })
    const { isLoading: isLoadingGroup } = useGetGroupInfo(groupId)
    const { data: groupStudents, isLoading: isLoadingStudents } = useGetGroupStudents(groupId, { page: pagination.page + 1, limit: pagination.limit })

    return (
        <div className={cls.page}>
            {(isLoadingStudents || isLoadingGroup) ? (
                <Loader />
            ) : (
                <>
                    <GroupInfoCard
                        groupId={groupId}
                        onClickCreateSchedule={() => navigate(`lesson-schedule`)}
                    />
                    {groupStudents?.items?.length > 0 ? (
                        <>
                            <GroupStudentsTable
                                students={groupStudents?.items}
                                startIndex={pagination.page * pagination.limit}
                            />
                            <Pagination
                                initialPage={pagination.page}
                                pageCount={groupStudents?.meta?.totalPages}
                                onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
                            />
                        </>
                    ) : (
                        <EmptyData />
                    )}
                </>
            )}
        </div>
    );
}

export default SingleGroup;