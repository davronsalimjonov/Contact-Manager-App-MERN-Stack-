import cls from './MentorsStatisticTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import MentorsStatisticTableRow from '@/components/UI/moleculs/MentorsStatisticTableRow';
import ServisStatisticTableHeader from '@/components/UI/organisms/ServisStatisticTableHeader';
import { getUserFullName } from '@/utils/lib';

const MentorsStatisticTable = ({
    data = [],
    isLoading = false,
}) => {
// TODO

    const currenPage = data?.meta?.currentPage || 1;
    const limit = data?.meta?.itemsPerPage || 10;

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {data?.items?.length > 0 ? (
                <table className={cls.table}>
                    <ServisStatisticTableHeader headers={["№", "Asosiy o’qituvchi", "Aktivlik", "Reytingi"]} />
                    <tbody>
                        <Mapper
                            data={data?.items?.lessons}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(mentor, index) => (
                                <MentorsStatisticTableRow key={`mentors+${mentor?.id}`}
                                    index={(currenPage - 1) * limit + index + 1}
                                    mentor={getUserFullName(mentor)}
                                    avatar={mentor?.url}
                                    avarageRate={mentor?.rate}
                                    // countStudents={mentor?.countStudents}
                                    activity={mentor?.activity}
                                />
                            )}
                        />
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData text="Sizda hozirda hech qanday ma'lumot mavjud emas." />
            )}
            {isLoading && <Loader size={80} />}
        </div>
    )
}

export default MentorsStatisticTable;