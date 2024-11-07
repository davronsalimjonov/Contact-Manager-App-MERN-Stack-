import React from 'react'
import cls from "./mainCardStats.module.scss"

const MainCardStats = ({ 
    stat = <></>, 
    percentage = ""
 }) => {
  return (
    <div className={cls.MainCardStats}>
        <div>
            <span>
                {stat}
                <p>
                    {percentage}
                </p>
            </span>
            <p>Bu Oydagi Natijalar</p>
        </div>
    </div>
  )
}

export default MainCardStats