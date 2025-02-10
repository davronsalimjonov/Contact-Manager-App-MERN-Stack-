import ScheduleTable from "@/components/templates/ScheduleTable"
import cls from "./ScheduleHomeWork.module.scss"
import Pagination from "@/components/UI/moleculs/Pagination"
import ScheduleHeader from "@/components/UI/organisms/ScheduleHeader"

const ScheduleHomeWork = () => {

    return (
        <div className={cls.ScheduleHomeWork}>
            <div className={cls.ScheduleHomeWork__ScheduleHeader}>
                <ScheduleHeader />
            </div>
            <div className={cls.ScheduleHomeWork__table}>
                <ScheduleTable />
            </div>
            <div className={cls.ScheduleHomeWork__pagination}>
                <div>
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default ScheduleHomeWork