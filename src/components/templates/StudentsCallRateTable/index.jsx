import cls from './StudentsCallRateTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import ServisStatisticTableHeader from "@/components/UI/organisms/ServisStatisticTableHeader";
import StudentsCallRateTableRow from '@/components/UI/moleculs/StudentsCallRateTableRow';

const StudentsCallRateTable = ({
    headers,
    data = [],
    pagination,
    isLoading = false,
}) => {
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {data?.length > 0 ? (
                <table className={cls.table}>
                    <ServisStatisticTableHeader headers={headers} />
                    <tbody>
                        <Mapper
                            data={data}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(rate, index) => (
                                <StudentsCallRateTableRow
                                    index={(pagination.page - 1)*10 + index + 1}
                                    avatar={rate?.student?.url}
                                    teacher={rate?.student}
                                    date={new Date(rate?.date)}
                                    duration={rate?.audio?.duration}
                                    comment={rate?.comment}
                                    rate={rate?.rate}
                                    key={rate?.id}

                                />
                            )}
                        />
                    </tbody>
                </table>
            ) : (
                !isLoading && <EmptyData />
            )}
            {isLoading && <Loader size={80} />}
        </div>
    )
}

export default StudentsCallRateTable;