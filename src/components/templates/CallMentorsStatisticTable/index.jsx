import { getUserFullName } from "@/utils/lib";
import { useNavigate } from "react-router-dom";
import EmptyData from "@/components/UI/organisms/EmptyData";
import CallMentorsStatisticTableRow from "@/components/UI/moleculs/CallMentorsStatisticTableRow";
import cls from './CallMentorsStatisticTable.module.scss';

const CallMentorsStatisticTable = ({ mentors = [] }) => {
    const navigate = useNavigate()

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {mentors?.length > 0 ? (
                <table className={cls.table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Ism familiyasi</th>
                            <th>Qo'ng'iroqlar soni</th>
                            <th>Adaptatsiyalar soni</th>
                            <th>Mentor aktivligi</th>
                            <th>Oylik maosh</th>
                            <th>Reyting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentors.map((mentor, index) => (
                            <CallMentorsStatisticTableRow
                                key={mentor?.id}
                                index={index + 1}
                                onClick={() => navigate(mentor?.id)}
                                fullName={getUserFullName(mentor)}
                                callsCount={(mentor?.calls?.split('/')?.[0]) || 0}
                                adaptationCount={mentor?.adaptationCount || 0}
                                mentorActivityPercentage={mentor?.active || 0}
                                salary={mentor?.salary || 0}
                                rating={mentor?.rating || 0}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData text="Bizda hozirda hech qanday ma'lumot mavjud emas." />
            )}
        </div>
    )
}

export default CallMentorsStatisticTable;