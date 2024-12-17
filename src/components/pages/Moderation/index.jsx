import Tabs from "@/components/UI/moleculs/Tabs";
import cls from './Moderation.module.scss';
import { useState } from "react";
import ModerationAllCourseRate from "@/components/UI/organisms/ModerationAllCourseRate";
import { useParams } from "react-router-dom";

const options = [
    { value: "null", label: "Hamma fikrlar" },
    { value: true, label: "Qabul qilingan fikrlar" },
    { value: false, label: "Rad etilgan fikrlar" }
]

const Moderation = () => {
    const { courseId } = useParams('courseId');

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

            <ModerationAllCourseRate activeTab={activeTab} courseId={courseId} />

        </div>
    )
}

export default Moderation;