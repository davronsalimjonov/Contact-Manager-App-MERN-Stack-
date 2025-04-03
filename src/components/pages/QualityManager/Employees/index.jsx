import Loader from '@/components/UI/atoms/Loader'
import useSessionState from '@/hooks/useSessionState'
import { useGetQualityControlEmployees } from '@/hooks/useQualityControl'
import QualityControlEmployeesTable from '@/components/templates/QualityControlEmployeesTable'
import QualityControlEmployeesSearchBar from '@/components/UI/organisms/QualityControlEmployeesSearchBar'
import cls from './Employees.module.scss'

const Employees = () => {
    const [filter, setFilter] = useSessionState('quality-control-employees', {})
    const { data: employees, isLoading: isLoadingEmployees } = useGetQualityControlEmployees(filter)

    const handleFilterChange = (newFilter) => {
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    return (
        <div className={cls.page}>
            <QualityControlEmployeesSearchBar
                onChange={handleFilterChange}
                defaultValue={filter}
            />
            {!isLoadingEmployees ? (
                <QualityControlEmployeesTable items={employees} />
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default Employees