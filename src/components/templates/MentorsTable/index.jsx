import { getUserFullName } from '@/utils/lib';
import Mapper from '@/components/UI/atoms/Mapper';
import Loader from '@/components/UI/atoms/Loader';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './MentorsTable.module.scss';
import MentorsTableHeader from '@/components/UI/organisms/UsersTableHeader';
import MentorsTableRow from '@/components/UI/moleculs/UsersTableRow';

const MentorsTable = ({
    students = [],
    triggerRef,
    isLoading,
}) => {

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {students?.length > 0 ? (
                <>
                    <table className={cls.table}>
                        <MentorsTableHeader />
                        <tbody>
                            <Mapper
                                data={students}
                                isInfinityQuery
                                isLoading={isLoading}
                                renderItem={(student, index) => (
                                    <MentorsTableRow
                                        key={student?.id}
                                        index={index + 1}
                                        fullName={getUserFullName(student)}
                                        avatar={student?.url}
                                        phoneNumber={student?.phone}
                                        degree={student?.degree}
                                        status={student?.status}
                                        student={student?.student}
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