import QualityControlSalesTableRow from '@/components/UI/moleculs/QualityControlSalesTableRow'
import cls from './QualityControlSalesTable.module.scss'

const QualityControlSalesTable = () => {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <table className={cls.table}>
                <thead className={cls.head}>
                    <tr >
                        <th>№</th>
                        <th>Ism,familiya</th>
                        <th>Telefon nomer</th>
                        <th>Ogohlantirish</th>
                        <th>Jarimalar</th>
                        <th>Summa</th>
                        <th>Operator</th>
                        <th>Xodim</th>
                    </tr>
                </thead>
                <tbody>
                    <QualityControlSalesTableRow />
                </tbody>
            </table>
        </div>
    )
}

export default QualityControlSalesTable