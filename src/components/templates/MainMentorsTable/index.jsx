import MentorsTableHeader from "@/components/UI/organisms/MentorsTableHeader";
import cls from './MainMentorsTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import { formatNumber } from "@/utils/formatNumber";
import EmptyData from "@/components/UI/organisms/EmptyData";
import { formatTime } from "@/utils/formatTime";
import MainMentorsTableRow from "@/components/UI/moleculs/MainMentorsTableRow";

const MainMentorsTable = ({
    mentors = [],
    isLoading = false
}) => {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {mentors?.length > 0 ? (
                <table className={cls.table}>
                    <MentorsTableHeader mentorType={"Asosiy"} headers={["№","Asosiy","O'quvchilarining aktivligi","Oylik maoshi","Task bajarish tezligi",""]} />
                    <tbody>
                        <Mapper
                            data={mentors}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(mentor, index) => (
                                <MainMentorsTableRow key={mentor?.id}
                                    mentorId={mentor?.id}
                                    index={index + 1}
                                    mentor={mentor.firstName + ' ' + mentor.lastName}
                                    activityStudents={mentor.active + '%'}
                                    reyting={mentor.lessonRate}
                                    salary={formatNumber(mentor.salary)}
                                    speed={formatTime(mentor.taskSpeed) + ' s'}
                                />
                            )}
                        />
                        <tr ></tr>
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData text="Sizda hozirda hech qanday ma'lumot mavjud emas."/>
            )}
            {isLoading && <Loader size={80} />}
        </div>
    )
}

export default MainMentorsTable;