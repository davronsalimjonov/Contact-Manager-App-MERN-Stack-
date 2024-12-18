import cls from './MentorsStatisticLeaderboard.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import MentorsStatisticTableRow from '@/components/UI/moleculs/MentorsStatisticTableRow';
import { getUserFullName } from '@/utils/lib';


// TODO
const MentorsStatisticLeaderboard = () => {

    const data = {}

    const isLoading=false
    return (
        <div style={{ overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {data?.length > 0 ? (
                <table className={cls.table}>
                    <tbody>
                        <Mapper
                            data={data}
                            isInfinityQuery
                            isLoading={isLoading}
                            renderItem={(mentor, index) => (
                                <MentorsStatisticTableRow key={mentor?.id}
                                    index={index + 1}
                                    mentor={getUserFullName(mentor)}
                                    avatar={mentor?.url}
                                    avarageRate={mentor?.rate}
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

export default MentorsStatisticLeaderboard;