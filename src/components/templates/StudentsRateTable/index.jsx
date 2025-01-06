import cls from './StudentsRateTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import ServisStatisticTableHeader from "@/components/UI/organisms/ServisStatisticTableHeader";
import StudentsRateTableRow from '@/components/UI/moleculs/StudentsRateTableRow';

const StudentsRateTable = ({
    headers,
    data = [],
    isLoading = false,
}) => {
    const currenPage = data?.meta?.currentPage;
    const limit = data?.meta?.itemsPerPage;


    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {data?.items?.length > 0 ? (
                <table className={cls.table}>
                    <ServisStatisticTableHeader headers={headers} />
                    <tbody>
                        <Mapper
                            data={data?.items}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(rate, index) => (
                                <StudentsRateTableRow
                                    date={rate.date}
                                    index={(currenPage - 1) * limit + index + 1}
                                    rate={rate.rate}
                                    ratedStudentCount={rate.ratedStudentCount}
                                    totalStudentCount={rate.totalStudentCount}
                                    key={rate.id}

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

export default StudentsRateTable;