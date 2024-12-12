import cls from './ServisStatisticTable.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import ServisStatisticTableHeader from "@/components/UI/organisms/ServisStatisticTableHeader";
import ServisStatisticTableRow from '@/components/UI/moleculs/ServisStatisticTableRow';

const ServisStatisticTable = ({
    headers,
    data = [],
    isLoading = false,
    activeTab
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
                            renderItem={(mentor, index) => (
                                <ServisStatisticTableRow key={mentor?.id}
                                    activeTab={activeTab}
                                    teacherId={mentor?.id}
                                    index={index + 1}
                                    mentor={mentor?.firstName + ' ' + mentor?.lastName}
                                    avarageRate={mentor?.rate}
                                    avatar={mentor?.url}
                                    group={mentor?.group}
                                    groupId={mentor?.groupId}
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

export default ServisStatisticTable;