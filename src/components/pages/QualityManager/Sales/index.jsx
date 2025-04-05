
import QualityControlSalesTable from '@/components/templates/QualityControlSalesTable'
import QualityControlSalesSearchBar from '@/components/UI/organisms/QualityControlSalesSearchBar'
import Pagination from '@/components/UI/moleculs/CustomPagination'
import cls from './QualityControlSales.module.scss'

const QualityControlSales = () => {
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
        <QualityControlSalesSearchBar />
        <QualityControlSalesTable
          items={data}
        />
        <Pagination
            initialPage={0}
            page={0}
            pageCount={10}
        />
    </div>
  )
}

export default QualityControlSales