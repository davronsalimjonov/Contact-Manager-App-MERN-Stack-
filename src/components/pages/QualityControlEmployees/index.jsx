import QualityControlEmployeesTable from '@/components/templates/QualityControlEmployeesTable'
import QualityControlEmployeesSearchBar from '@/components/UI/organisms/QualityControlEmployeesSearchBar'
import cls from './QualityControlEmployees.module.scss'
import { useGetQualityControlEmployees } from '@/hooks/useQualityControl'
import useSessionState from '@/hooks/useSessionState'
import Loader from '@/components/UI/atoms/Loader'

const QualityControlEmployees = () => {
    const [filter, setFilter] = useSessionState('quality-control-employees', {})
    const { data: qualityControlEmployees, isLoading: isLoadingQualityControlEmployees } = useGetQualityControlEmployees(filter)

    const handleFilterChange = (newFilter) => {
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    return (
        <div className={cls.page}>
            {isLoadingQualityControlEmployees ? <Loader /> : (
                <>
                    <QualityControlEmployeesSearchBar
                        onChange={handleFilterChange}
                        defaultValue={filter}
                    />
                    <QualityControlEmployeesTable
                        employees={qualityControlEmployees}
                    />
                </>
            )}
        </div>
    )
}

export default QualityControlEmployees