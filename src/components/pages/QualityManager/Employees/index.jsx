import Loader from '@/components/UI/atoms/Loader'
import useSessionState from '@/hooks/useSessionState'
import { useGetQualityControlEmployees } from '@/hooks/useQualityControl'
import QualityControlEmployeesTable from '@/components/templates/QualityControlEmployeesTable'
import QualityControlEmployeesSearchBar from '@/components/UI/organisms/QualityControlEmployeesSearchBar'
import cls from './Employees.module.scss'
import QualityControlAddUserForm from '@/components/UI/organisms/QualityControlAddUserForm'
import { useState } from 'react'

const QualityControlEmployees = () => {
    const [filter, setFilter] = useSessionState('quality-control-employees', {})
    const { data: employees, isLoading: isLoadingEmployees } = useGetQualityControlEmployees(filter)
    const [isOpen, setIsOpen] = useState({ isOpen: false })
    

    const handleFilterChange = (newFilter) => {
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    const data = [{
        employee: {
          firstName: "Jack",
          lastName: "Jackson",
          url: "0.jpg"
        },
        operator: {
          firstName: "Jack",
          lastName: "Jackson",
          url: "0.jpg"
        },
        warning: '1',
        penalty: '1',
        sum: "100 000",
        phone: "+998974119554"
      }]

    return (
        <div className={cls.page}>
            <QualityControlAddUserForm
                isOpen={isOpen?.isOpen}
                setIsOpen={setIsOpen}
            />
            <QualityControlEmployeesSearchBar
                onChange={handleFilterChange}
                defaultValue={filter}
                setIsOpen={setIsOpen}
            />
            {!isLoadingEmployees ? (
                <QualityControlEmployeesTable items={data} />
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default QualityControlEmployees