import EmployeeStatusBadge from '../../atoms/EmployeeStatusBadge'
import TableActionButton from '../TableActionButton'
import cls from './QualityControlEmployeesTableRow.module.scss'

const QualityControlEmployeesTableRow = ({
  index = 1,
  fullName = 'Abdu Sattorich',
  phoneNumber = '+998 99 999 99 99',
  status='Sinovda'
}) => {

  const dropdownMenuItems = [ 
    { label: 'Shaxsiy ma`lumotlar', onClick: () => {} },
    { label: 'Parolni O`zgartirish', onClick: () => {} },
  ]

  return (
    <tr className={cls.row}>
      <td>{index}</td>
      <td>{fullName}</td>
      <td>{phoneNumber}</td>
      <td className={cls.row__center}><EmployeeStatusBadge status={status} /></td>
      <td onClick={e => e.stopPropagation()}>
        <TableActionButton menuItems={dropdownMenuItems} />
      </td>
    </tr>
  )
}

export default QualityControlEmployeesTableRow