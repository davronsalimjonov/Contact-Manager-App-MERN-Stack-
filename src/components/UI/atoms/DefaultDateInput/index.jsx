import cls from './DefaultDateInput.module.scss'

const DefaultDateInput = ({
    label = ""
}) => {
  return (
    <div className={cls.DefaultDateInput}>
        <label htmlFor="">{label}</label>
        <input type="date" placeholder='kk.oo.yyyy' />
    </div>
  )
}

export default DefaultDateInput