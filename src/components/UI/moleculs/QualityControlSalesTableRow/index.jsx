import Avatar from '../../atoms/Avatar'
import cls from './QualityControlSalesTableRow.module.scss'

const QualityControlSalesTableRow = ({
    index=1,
    fullName='Abdu Sattorich',
    phoneNumber='+998 99 999 99 99',
    warning=1,
    penalty=1,
    quantity='100 000',
    operator='Abdu Sattorich',
    operatorAvatar,
}) => {
  return (
    <tr className={cls.row}>
        <td>{index}</td>
        <td>{fullName}</td>
        <td>{phoneNumber}</td>
        <td className={cls.row__center}>{warning}</td>
        <td className={cls.row__center}>{penalty}</td>
        <td>{quantity} UZS</td>
        <td className={cls.row__operator}>
            <div>
                <Avatar src={operatorAvatar} alt="operator" />
                <p>{operator}</p>
            </div>
        </td>
        <td className={cls.row__operator}>
            <div>
                <Avatar src={operatorAvatar} alt="operator" />
                <p>{operator}</p>
            </div>
        </td>
    </tr>
  )
}

export default QualityControlSalesTableRow