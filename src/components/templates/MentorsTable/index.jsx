import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFullName } from '@/utils/lib';
import EmptyData from '@/components/UI/organisms/EmptyData';
import MentorsTableRow from '@/components/UI/moleculs/MentorsTableRow';
import CreateMentorCardModal from '@/components/UI/organisms/CreateMentorCardModal';
import cls from './MentorsTable.module.scss';

const MentorsTable = ({
    mentors = [],
    startIndex = 0
}) => {
    const navigate = useNavigate()
    const [mentorCardModal, setMentorCardModal] = useState({ isOpen: false, mentorId: null })

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <CreateMentorCardModal
                isOpen={mentorCardModal.isOpen}
                mentorId={mentorCardModal.mentorId}
                onClose={() => setMentorCardModal({ isOpen: false, mentorId: null })}
            />
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
                                index={startIndex + index + 1}
                                avatar={mentor?.url}
                                fullName={getUserFullName(mentor)}
                                phoneNumber={mentor?.phone}
                                degree={mentor?.degree}
                                status={mentor?.status}
                                studentCount={mentor?.student}
                                cards={mentor?.cards}
                                onClickMentorInfo={() => navigate(`${mentor?.id}?role=${mentor?.role}`)}
                                onClickAdjustment={() => setMentorCardModal({ isOpen: true, mentorId: mentor?.id })}
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