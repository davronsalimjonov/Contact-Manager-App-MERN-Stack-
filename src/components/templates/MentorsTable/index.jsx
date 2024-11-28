import MentorsTableRow from "@/components/UI/moleculs/MentorsTableRow";
import MentorsTableHeader from "@/components/UI/organisms/MentorsTableHeader";
import cls from './MentorsTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import { formatNumber } from "@/utils/formatNumber";

const MentorsTable = ({
    mentors=[],
    isLoading=false
})=> {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {mentors?.length > 0 ? (
            <table className={cls.table}>
                <MentorsTableHeader mentorType={"Asosiy"}/>
                <tbody>
                    <Mapper
                        data={mentors}
                        isInfinityQuery
                        isLoading={isLoading}
                        renderItem={(mentor, index) => (
                            <MentorsTableRow
                                key={mentor?.id}
                          index={index+1}
                         mentor={mentor.firstName + ' ' + mentor.lastName} 
                         activityStudents={mentor.active+'%'}    
                         reyting={mentor.lessonRate}
                         salary={formatNumber(mentor.salary)}
                         speed={mentor.taskSpeed}
                            />
                        )}
                    />
                    <tr ></tr>
                </tbody>
            </table>
        ) : (
            !isLoading && <EmptyData />
        )}
        {isLoading && <Loader size={80} />}
    </div>
    )
}

export default MentorsTable;