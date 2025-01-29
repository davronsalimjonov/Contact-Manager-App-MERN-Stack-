import ScheduleTable from "@/components/templates/ScheduleTable"
import cls from "./ScheduleHomeWork.module.scss"
import Pagination from "@/components/UI/moleculs/Pagination"


const ScheduleHomeWork = () => {
    return (
        <div className={cls.ScheduleHomeWork}>
            <div>
                <ScheduleTable />
            </div>
            <div>
                <div>
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default ScheduleHomeWork