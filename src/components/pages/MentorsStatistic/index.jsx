import Tabs from "@/components/UI/moleculs/Tabs";
import cls from './MentorsStatistic.module.scss';
import { useState } from "react";
import CallRateStatistic from "@/components/UI/organisms/CallRateStatistic";
import TeachersStatistic from "@/components/UI/organisms/TeachersStatistic";
import MentorsStatisticLeaderboard from "@/components/templates/MentorsStatisticLeaderboard";

const options = [{ value: 'lesson', label: "Dars bo'yicha statistika" }, { value: 'call', label: "Call bo'yicha statistika" }]

const MentorsStatistic = () => {
    const [activeTab, setActiveTab] = useState(options?.[0]?.value);
    return (
        <div className={cls.content}>
            <div className={cls.content__tabs}>
                <Tabs
                    className={cls.form__tabs}
                    tabClassName={cls.form__tabs__btn}
                    activeTabClassName={cls.form__tabs__active}
                    options={options}
                    defaultValue={options?.[0]?.value}
                    onChange={setActiveTab}
                />

                {
                    activeTab === 'lesson' ? <TeachersStatistic /> : <CallRateStatistic />
                }
            </div>
            <MentorsStatisticLeaderboard/>
        </div>
    )
}

export default MentorsStatistic;