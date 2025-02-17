import { getUserFullName } from "@/utils/lib";
import { useNavigate } from "react-router-dom";
import EmptyData from "@/components/UI/organisms/EmptyData";
import MainMentorsStatisticTableRow from "@/components/UI/moleculs/MainMentorsStatisticTableRow";
import cls from './MainMentorsStatisticTable.module.scss';

const MainMentorsTable = ({ mentors = [] }) => {
    const navigate = useNavigate()

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {mentors?.length > 0 ? (
                <table className={cls.table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Ism familiyasi</th>
                            <th>O'quvchilarining aktivligi</th>
                            <th>Aktiv o'quvchilar soni</th>
                            <th>Mentor aktivligi</th>
                            <th>Oylik maosh</th>
                            <th>Reyting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentors.map((mentor, index) => (
                            <MainMentorsStatisticTableRow
                                key={mentor?.id}
                                index={index + 1}
                                onClick={() => navigate(mentor?.id)}
                                fullName={getUserFullName(mentor)}
                                activeStudentsPercentage={mentor?.activeStudentsPercentage || 0}
                                activeStudentsCount={mentor?.activeStudentsCount || 0}
                                mentorActivityPercentage={mentor?.mentorActivityPercentage || 0}
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

export default MainMentorsTable;