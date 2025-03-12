import { useState } from 'react'
import Tabs from '@/components/UI/moleculs/Tabs'
import Loader from '@/components/UI/atoms/Loader'
import { useGetMyGroups } from '@/hooks/useGetGroups'
import { useGetMainMentorStudents } from '@/hooks/useStudents'
import StudentsSearchBar from '@/components/UI/organisms/StudentsSearchBar'
import MainMentorStudentsTable from '@/components/templates/MainMentorStudentsTable'
import cls from './MainMentorStudents.module.scss'
import useSessionState from '@/hooks/useSessionState'

const MainMentorStudents = () => {
    const [filter, setFilter] = useSessionState('main-mentor-students-filter', {})
    const [selectedStudents, setSelectedStudents] = useState(new Set())
    const { data: students, isLoading: isLoadingStudents } = useGetMainMentorStudents(filter)
    const { data: groups } = useGetMyGroups()

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
                const studentIds = students.map(student => student.id)
                setSelectedStudents(new Set(studentIds))
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
        setSelectedStudents(new Set())
    }

    return (
        <div className={cls.page}>
            <Tabs
                options={getGroupOptions()}
                className={cls.page__tab}
                tabClassName={cls.page__tab__button}
                defaultValue={filter?.group}
                onChange={group => handleFilterChange({ group })}
            />
            <StudentsSearchBar
                onChange={handleFilterChange}
                defaultValue={filter}
            />
            {!isLoadingStudents ? (
                <MainMentorStudentsTable
                    students={students}
                    withCheckbox={!!filter?.group}
                    selectedStudents={selectedStudents}
                    onSelectStudent={handleStudentSelection}
                    onSelectAll={handleSelectAllStudents}
                    groupId={filter?.group}
                    isAllSelected={students.length > 0 && selectedStudents.size === students.length}
                />
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default MainMentorStudents