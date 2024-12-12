import Tabs from "@/components/UI/moleculs/Tabs";
import cls from './ServisStatistic.module.scss';
import { useState } from "react";
import LessonRateStatistic from "@/components/UI/organisms/LessonRateStatistic";
import CallRateStatistic from "@/components/UI/organisms/CallRateStatistic";

const options = [{ value: 'lesson', label: "Dars bo'yicha statistika" }, { value: 'call', label: "Call bo'yicha statistika" }]

const ServisStatistic = () => {
    const [activeTab, setActiveTab] = useState(options?.[0]?.value);
      return (
        <div className={cls.content}>
            <Tabs
                className={cls.form__tabs}
                tabClassName={cls.form__tabs__btn}
                activeTabClassName={cls.form__tabs__active}
                options={options}
                defaultValue={options?.[0]?.value}
                onChange={setActiveTab}
            />

            {
                activeTab === 'lesson' ? <LessonRateStatistic/> : <CallRateStatistic/>
            }
        </div>
    )
}

export default ServisStatistic;