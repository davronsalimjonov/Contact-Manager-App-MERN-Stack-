import { useState, useEffect } from 'react'
import Tabs from '@/components/UI/moleculs/Tabs'
import Loader from '@/components/UI/atoms/Loader'
import { useGetMyGroups } from '@/hooks/useGetGroups'
import { useGetMainMentorStudents, useGetMainMentorStudentsIds   } from '@/hooks/useStudents'
import Pagination from '@/components/UI/moleculs/CustomPagination'
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar'
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable'
import cls from './MainMentorStudents.module.scss'

const MainMentorStudents = () => {
    const [filter, setFilter] = useState({})
    const [selectedStudents, setSelectedStudents] = useState(new Set())
    const [pagination, setPagination] = useState({ page: 0, limit: 10 })
    const [allStudentIds, setAllStudentIds] = useState([])
    const { data: paginatedStudents, isLoading: isLoadingPaginatedStudents } = useGetMainMentorStudents({ ...filter, page: pagination.page + 1, limit: pagination.limit })
    const { data: allStudents, isLoading: isLoadingAllStudents, refetch: refetchAllStudents } = useGetMainMentorStudentsIds(filter, { enabled: false })
    const { data: groups, isLoading: isLoadingGroups } = useGetMyGroups()
    const hasPagination = paginatedStudents?.meta?.totalPages > 0

    useEffect(() => {
        if (allStudents) {
            const studentIds = allStudents.map(student => student.id)
            setAllStudentIds(studentIds)
        }
    }, [allStudents])

    const handleStudentSelection = (studentId, isSelected) => {
        setSelectedStudents(prevSelected => {
            const newSelected = new Set(prevSelected)
            if (isSelected) {
                newSelected.add(studentId)
            } else {
                newSelected.delete(studentId)
            }
            return newSelected
        })
    }

    const handleSelectAllStudents = async (isSelected) => {
        if (isSelected) {
            try {
                const response = await refetchAllStudents()
                if (response.data) {
                    const studentIds = response.data
                    setAllStudentIds(studentIds)
                    setSelectedStudents(new Set(studentIds))
                }
            } catch (error) {
                console.error('Failed to fetch all students', error)
            }
        } else {
            setSelectedStudents(new Set())
        }
    }

    function getGroupOptions() {
        const options = [{ value: '', label: 'Barchasi' }]
        groups?.forEach(group => {
            options.push({ value: group.id, label: group.title })
        })
        return options
    }

    const handleFilterChange = (newFilter) => {
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter }))
        setPagination(state => ({ ...state, page: 0 }))
        setSelectedStudents(new Set())
        setAllStudentIds([])
    }

    return (
        <div className={cls.page}>
            <Tabs
                options={getGroupOptions()}
                className={cls.page__tab}
                tabClassName={cls.page__tab__button}
                onChange={group => handleFilterChange({ group })}
            />
            <StudentsSearchBar
                onChangeStatus={(status) => handleFilterChange({ status: status?.value })}
                onChangeFirstName={e => handleFilterChange({ firstName: e.target.value?.trim() })}
                onChangeLastName={e => handleFilterChange({ lastName: e.target.value?.trim() })}
                onChangePhone={phone => handleFilterChange({ phone })}
            />
            {!isLoadingPaginatedStudents ? (
                <MainMentorStudentsTable
                    students={paginatedStudents?.items}
                    startIndex={(pagination.page) * pagination.limit}
                    withCheckbox={!!filter?.group}
                    selectedStudents={selectedStudents}
                    onSelectStudent={handleStudentSelection}
                    onSelectAll={handleSelectAllStudents}
                    groupId={filter?.group}
                    isAllSelected={allStudentIds.length > 0 && selectedStudents.size === allStudentIds.length}
                    isAllStudentsLoading={isLoadingAllStudents}
                />
            ) : (
                <Loader />
            )}
            {hasPagination && (
                <Pagination
                    page={pagination.page}
                    pageCount={paginatedStudents?.meta?.totalPages}
                    onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
                    initialPage={pagination.page}
                />
            )}
        </div>
    )
}

export default MainMentorStudents