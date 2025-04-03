import React from 'react'
import Select from '../../atoms/Form/Select'
import PhoneInput from '../../atoms/Form/PhoneInput'
import Input from '../../atoms/Form/Input'
import cls from './QualityControlSalesSearchBar.module.scss'

const QualityControlSalesSearchBar = () => {
  return (
    <div className={cls.bar}>
        <Select
            placeholder='Operatorni tanlang'
            isSearchable
            isclearable
            className={cls.bar__select}
        />
        <Select
            placeholder='Xodimni tanlang'
            isSearchable
            isclearable
            className={cls.bar__select}
        />
        <PhoneInput
            placeholder='Telefon raqam'
            className={cls.bar__input}
        />
        <Input
            placeholder='Ism'
            className={cls.bar__input}
        />
        <Input
            placeholder='Familiya'
            className={cls.bar__input}
        />
    </div>
  )
}

export default QualityControlSalesSearchBar