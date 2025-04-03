import QualityControlSalesTable from "@/components/templates/QualityControlSalesTable"
import QualityControlSalesSearchBar from "@/components/UI/organisms/QualityControlSalesSearchBar"
import cls from './QualityControlSales.module.scss'
import Pagination from "@/components/UI/moleculs/CustomPagination"

const QualityControlSales = () => {
  return (
    <div className={cls.page}>
        <QualityControlSalesSearchBar />
        <QualityControlSalesTable />
        <Pagination
            initialPage={0}
            page={0}
            pageCount={10}
        />
    </div>
  )
}

export default QualityControlSales