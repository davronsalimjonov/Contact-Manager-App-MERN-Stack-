import MentorsTableHeader from "@/components/UI/organisms/MentorsTableHeader";
import cls from './CallMentorsTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import CallMentorsTableRow from "@/components/UI/moleculs/CallMentorsTableRow";

const CallMentorsTable = ({
    mentors = [],
    isLoading = false
}) => {

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {mentors?.length > 0 ? (
                <table className={cls.table}>
                    <MentorsTableHeader headers={["№", "Nazoratchi mentor", "Qo'ng'iroqlar soni", "Davomiyligi", "Oyligi", "Task bajarish tezligi", ""]} />
                    <tbody>
                        <Mapper
                            data={mentors}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(mentor, index) => (
                                <CallMentorsTableRow key={mentor?.id}
                                    mentorId={mentor?.id}
                                    index={index + 1}
                                    mentor={mentor.firstName + ' ' + mentor.lastName}
                                    callCount={mentor.callCount}
                                    callDuration={mentor.callDuration}
                                    salary={mentor.salary}
                                    taskSpeed={mentor.taskSpeed}
                                    callRate={mentor.callRate}

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

export default CallMentorsTable;