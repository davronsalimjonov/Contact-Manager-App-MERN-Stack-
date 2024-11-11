import React from 'react'
import cls from "./Settings.module.scss"
import DefaultInput from '../../atoms/DefaultInput'
import DefaultDateInput from '../../atoms/DefaultDateInput'
import DefaultGenderInput from '../../atoms/DefaultGenderInput'
import SettingsProfilePicture from '../../atoms/SettingsProfilePicture'
import DefaultBtn from '../../atoms/DefaultBtn'
import { DefaultBtnData, DefaultDateInputData, DefaultGenderInputData, DefaultInputData } from './data'

const Settings = () => {
  return (
    <div className={cls.settings}>
        <form action="submit">
            <div className={cls.pfp}>
                <SettingsProfilePicture />
            </div>
            <div className={cls.inputs}>
                {DefaultInputData.map((item) => (
                    <div key={`DefaultInput-${item?.id}`}>
                        <DefaultInput label={item?.label} defaultVal={item?.defualtVal} type={item?.type} />
                    </div>
                ))}
                <div className={cls.radios}>
                    <label htmlFor="input">Jinsi</label>
                    <div>
                        {DefaultGenderInputData.map((item) => (
                            <div key={`DefaultGenderInput-${item?.id}`}>
                                <DefaultGenderInput gender={item?.gender} label={item?.label} />
                            </div>
                        ))}
                    </div>
                </div>
                {DefaultDateInputData.map((item) => (
                    <div key={`DefaultDateInputData-${item?.id}`}>
                        <DefaultDateInput label={item?.label} />
                    </div>
                ))}
            </div>
            <div className={cls.btns}>
                {DefaultBtnData.map((item) => (
                    <div key={`DefaultBtndata-${item?.id}`}>
                        <DefaultBtn buttonTxt={item?.buttonTxt} bg={item?.bg} disabled={item?.disabled} />  
                    </div>
                ))}
            </div>
        </form>
    </div>
  )
}

export default Settings