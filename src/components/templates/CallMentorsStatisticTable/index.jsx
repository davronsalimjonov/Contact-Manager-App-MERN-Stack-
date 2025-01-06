import cls from './CallMentorsStatisticTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import ServisStatisticTableHeader from '@/components/UI/organisms/ServisStatisticTableHeader';
import { getUserFullName } from '@/utils/lib';
import CallMentorsStatisticTableRow from '@/components/UI/moleculs/CallMentorsStatisticTableRow';

const CallMentorsStatisticTable = ({
    data = [],
    isLoading = false,
}) => {
    const currenPage = data?.meta?.currentPage || 1;
    const limit = data?.meta?.itemsPerPage || 10;

    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {data?.items?.length > 0 ? (
                <table className={cls.table}>
                    <ServisStatisticTableHeader headers={["№", "Nazoratchi o’qituvchi", "Oylik call", "Kunlik call", "Reytingi"]} />
                    <tbody>
                        <Mapper
                            data={data?.items}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(mentor, index) => (
                                <CallMentorsStatisticTableRow key={mentor?.id}
                                    index={(currenPage - 1) * limit + index + 1}
                                    mentor={getUserFullName(mentor)}
                                    avatar={mentor?.url}
                                    avarageRate={mentor?.rate}
                                    // countStudents={mentor?.countStudents}
                                    monthCall={mentor?.callCount}
                                    dailyCall={mentor?.averageCallPerDay}
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

export default CallMentorsStatisticTable;