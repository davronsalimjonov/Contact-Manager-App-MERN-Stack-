import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import MentorsTableRow from '@/components/UI/moleculs/MentorsTableRow';
import cls from './MentorsTable.module.scss';

const MentorsTable = ({
    mentors = [],
    startIndex = 0
}) => {
    const navigate = useNavigate()
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {mentors?.length > 0 ? (
                <table className={cls.table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Ism familiyasi</th>
                            <th>Telefon Nomer</th>
                            <th>Daraja</th>
                            <th>Statusi</th>
                            <th>O'quvchilar Soni</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentors?.map((mentor, index) => (
                            <MentorsTableRow
                                key={mentor?.id}
                                role={mentor?.role}
                                index={startIndex + index + 1}
                                avatar={mentor?.url}
                                fullName={getUserFullName(mentor)}
                                phoneNumber={mentor?.phone}
                                degree={mentor?.degree}
                                status={mentor?.status}
                                studentCount={mentor?.student}
                                cards={mentor?.cards}
                                onClickMentorInfo={() => navigate(`/mentors/${mentor?.id}?role=${mentor?.role}`)}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData />
            )}
        </div>
    );
}

export default MentorsTable;