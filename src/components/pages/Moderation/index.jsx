import Tabs from "@/components/UI/moleculs/Tabs";
import cls from './Moderation.module.scss';
import { useState } from "react";
import ModerationAllCourseRate from "@/components/UI/organisms/ModerationAllCourseRate";
import { useParams } from "react-router-dom";
import ModerationAcceptedRate from "@/components/UI/organisms/ModerationAcceptedRate";
import ModerationDialog from "@/components/UI/organisms/ModerationDialog";
import Button from "@/components/UI/atoms/Buttons/Button";

const options = [
    { value: 0, label: "Hamma fikrlar" },
    { value: 1, label: "Qabul qilingan fikrlar" },
    { value: 2, label: "Rad etilgan fikrlar" }
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

            {
                activeTab === 0 ? <ModerationAllCourseRate courseId={courseId} /> : activeTab === 1 ? <ModerationAcceptedRate courseId={courseId} /> : <>Salom2</>
            }
        </div>
    )
}

export default Moderation;