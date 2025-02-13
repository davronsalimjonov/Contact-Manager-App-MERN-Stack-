import { useNavigate } from 'react-router-dom';
import Mapper from '@/components/UI/atoms/Mapper';
import ScheduleTableHeader from '@/components/UI/organisms/ScheduleTableHeader';
import ScheduleTableRow from '@/components/UI/organisms/ScheduleTableRow';
import { customToast } from '@/utils/toast';
import cls from './ScheduleTable.module.scss';

const ScheduleTable = ({
    students,
    isLoading,
}) => {
    const navigate = useNavigate()

    return (
        <div className={cls.tableWrapper}>
            <table className={cls.ScheduleTable}>
                <ScheduleTableHeader />
                <tbody>
                    <ScheduleTableRow
                        onClick={() => navigate('homework/1')}
                    />
                    <Mapper
                        data={students}
                        isInfinityQuery
                        isLoading={isLoading}
                        renderItem={(student, index) => (
                            <ScheduleTableRow
                                onClick={() => {
                                    student?.lessonHomeWork
                                        ? navigate(`/schedule/homework/details/${student?.id}`)
                                        : customToast.error("O'quvchi Vazifa Topshirmagan");
                                }}
                                key={student?.id}
                                fullName={`${student?.student?.user?.firstName} ${student?.student?.user?.lastName}`}
                                idx={index + 1}
                                attendance={student?.attendance}
                                homework={student?.lessonHomeWork?.description}
                            />
                        )}
                    />

                </tbody>
            </table>
        </div>
    );
}

export default ScheduleTable;