import { getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './MentorsTable.module.scss';
import MentorsTableHeader from '@/components/UI/organisms/MentorsTableHeader';
import MentorsTableRow from '@/components/UI/moleculs/MentorsTableRow';

const MentorsTable = ({
    mentors = [],
    triggerRef,
    isLoading,
}) => {

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {mentors?.length > 0 ? (
                <>
                    <table className={cls.table}>
                        <MentorsTableHeader />
                        <tbody>
                            <Mapper
                                data={mentors}
                                isInfinityQuery
                                isLoading={isLoading}
                                renderItem={(mentor, index) => (
                                    <MentorsTableRow
                                        mentorId={mentor?.id}
                                        key={mentor?.id}
                                        index={index + 1}
                                        fullName={getUserFullName(mentor)}
                                        avatar={mentor?.url}
                                        phoneNumber={mentor?.phone}
                                        degree={mentor?.degree}
                                        status={mentor?.status}
                                        student={mentor?.student}
                                        mentorRole={mentor?.role}
                                    />
                                )}
                            />
                            <tr ref={triggerRef}></tr>
                        </tbody>
                    </table>
                </>
            ) : (
                !isLoading && <EmptyData />  
            )}
            {isLoading && <Loader size={80} />}
        </div>
    );
}

export default MentorsTable;