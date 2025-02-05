import { useState } from 'react'
import Tabs from '@/components/UI/moleculs/Tabs'
import Loader from '@/components/UI/atoms/Loader'
import { useGetMyGroups } from '@/hooks/useGetGroups'
import { useGetMainMentorStudents } from '@/hooks/useGetStudents'
import Pagination from '@/components/UI/moleculs/CustomPagination'
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar'
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable'
import cls from './MainMentorStudents.module.scss'

const MainMentorStudents = () => {
    const [filter, setFilter] = useState({})
    const [pagination, setPagination] = useState({ page: 0, limit: 10 })
    const { data: groups, isLoading: isLoadingGroups } = useGetMyGroups()
    const { data: students, isLoading: isLoadingStudents } = useGetMainMentorStudents({ ...filter, page: pagination.page + 1, limit: pagination.limit })
    const hasPagination = students?.meta?.totalPages > 0

    function getGroupOptions() {
        const options = [{ value: '', label: 'Barchasi' }]

        groups?.forEach(group => {
            options.push({ value: group.id, label: group.title })
        })

        return options
    }

    return (
        <div className={cls.page}>
            <Tabs
                options={getGroupOptions()}
                className={cls.page__tab}
                tabClassName={cls.page__tab__button}
                onChange={group => (setFilter(state => ({ ...state, group })), setPagination(state => ({ ...state, page: 0 })))}
            />
            <StudentsSearchBar
                onChangeStatus={(status) => setFilter(state => ({ ...state, status: status?.value }))}
                onChangeFirstName={e => setFilter(state => ({ ...state, firstName: e.target.value?.trim() }))}
                onChangeLastName={e => setFilter(state => ({ ...state, lastName: e.target.value?.trim() }))}
                onChangePhone={phone => setFilter(state => ({ ...state, phone }))}
            />
            {!isLoadingStudents ? (
                <MainMentorStudentsTable
                    students={students?.items}
                    startIndex={(pagination.page) * pagination.limit}
                />
            ) : (
                <Loader />
            )}
            {hasPagination && (
                <Pagination
                    pageCount={students?.meta?.totalPages}
                    onPageChange={({ selected: page }) => setPagination({ ...pagination, page })}
                    initialPage={pagination.page}
                />
            )}
        </div>
    )
}

export default MainMentorStudents