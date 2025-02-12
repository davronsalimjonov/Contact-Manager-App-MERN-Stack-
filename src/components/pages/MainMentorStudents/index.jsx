import { useEffect, useState } from 'react'
import cls from './MainMentorStudents.module.scss'
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable'
import MainMentorStudentsSearchBar from '@/components/UI/organisms/MainMentorStudentsSearchBar/indsx'
import MainMentorStudentsGroupTab from '@/components/UI/organisms/MainMentorStudentsGroupTab'
import Loader from '@/components/UI/atoms/Loader'
import Pagination from '@/components/UI/moleculs/Pagination'
import { useGetGroupStudents } from '@/hooks/useGetGroupStudents'

const MainMentorStudents = () => {
    const [filter, setFilter] = useState({})
    const [groupId, setGroupId] = useState('')
    const [isTransfer, setIsTransfer] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [activeGroup, setActiveGroup] = useState('')
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    })

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const handleLimitChange = (limit) => {
        setPagination((prev) => ({ ...prev, limit }));
    };

    const {
        groupStudents: { data: groupStudents, isLoading: isGroupStudentsLoading, refetch },
        groupSelectStudents: { data: groupSelectStudents }
    } = useGetGroupStudents({ ...filter, ...pagination }, groupId)

    useEffect(() => { }, [groupStudents])

    return (
        <div className={cls.page}>
            <MainMentorStudentsGroupTab
                onGroupChange={id => setFilter(state => ({ ...state, group: id }))}
                setGroupId={setGroupId}
                setGroupLabel={setActiveGroup}
            />
            <MainMentorStudentsSearchBar
                onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
                onChangeGroup={group => setFilter(state => ({ ...state, group: group?.value }))}
                onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                setIsOpen={setIsOpen}
                groupId={groupId}
            />
            {!isGroupStudentsLoading ? (
                <>
                    <MainMentorStudentsTable
                        students={groupStudents?.items}
                        isLoading={isGroupStudentsLoading}
                        groupSelectStudents={groupSelectStudents}
                        groupId={groupId}
                        isTransfer={isTransfer}
                        setIsTransfer={setIsTransfer}
                        refetch={refetch}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        activeGroup={activeGroup}
                    />
                    {groupStudents?.items?.length === 0 ? <></>
                        : <Pagination
                            metaData={groupStudents?.meta}
                            limit={pagination.limit}
                            setLimit={handleLimitChange}
                            page={pagination.page}
                            setPage={handlePageChange}
                        />
                    }
                </>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default MainMentorStudents