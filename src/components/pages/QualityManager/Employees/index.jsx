import Loader from '@/components/UI/atoms/Loader'
import useSessionState from '@/hooks/useSessionState'
import { useCreateQualityControlEmployeeMutation, useGetQualityControlEmployees } from '@/hooks/useQualityControl'
import QualityControlEmployeesTable from '@/components/templates/QualityControlEmployeesTable'
import QualityControlEmployeesSearchBar from '@/components/UI/organisms/QualityControlEmployeesSearchBar'
import cls from './Employees.module.scss'
import QualityControlAddUserForm from '@/components/UI/organisms/QualityControlAddUserForm'
import { useState } from 'react'
import { objectToFormData } from '@/utils/lib'
import toast from 'react-hot-toast'

const QualityControlEmployees = () => {
    const [filter, setFilter] = useSessionState('quality-control-employees', {})
    const { data: employees, isLoading: isLoadingEmployees } = useGetQualityControlEmployees(filter)
    const [isOpen, setIsOpen] = useState({ isOpen: false })
    const createEmployee = useCreateQualityControlEmployeeMutation()

    const handleFilterChange = (newFilter) => {
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    const onSubmit = async (data) => {
        const newEmployee = Object.assign({}, data)
        const fd = objectToFormData(newEmployee)

        await createEmployee.mutateAsync(fd, {
            onSuccess: () => {
                toast.success('Xodim muvaffaqiyatli qo\'shildi')
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
            }
        })
    }

    return (
        <div className={cls.page}>
            <QualityControlAddUserForm
                isOpen={isOpen?.isOpen}
                setIsOpen={setIsOpen}
                onSubmit={onSubmit}
            />
            <QualityControlEmployeesSearchBar
                onChange={handleFilterChange}
                defaultValue={filter}
                setIsOpen={setIsOpen}
            />
            {!isLoadingEmployees ? (
                <QualityControlEmployeesTable items={employees} />
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default QualityControlEmployees