import cls from './MentorsStatisticLeaderboard.module.scss';
import Mapper from "@/components/UI/atoms/Mapper";
import Loader from "@/components/UI/atoms/Loader";
import EmptyData from "@/components/UI/organisms/EmptyData";
import { getUserFullName } from '@/utils/lib';
import MentorsStatisticLeaderboardTableRow from '@/components/UI/moleculs/MentorsStatisticLeaderboardTableRow';


// TODO
const MentorsStatisticLeaderboard = ({
    data,
    isLoading
}) => {
    const currenPage = data?.meta?.currentPage || 1;
    const limit = data?.meta?.itemsPerPage || 10;

    return (
        <div className={cls.leaderboard}>
            {data?.items?.length > 0 ? (
                <>
                    <h2 className={cls.leaderboard__header}>Leaderboard</h2>
                    <table className={cls.leaderboard__table}>
                        <tbody>
                            <Mapper
                                data={data?.items}
                                isInfinityQuery
                                isLoading={isLoading}
                                renderItem={(mentor, index) => (
                                    <MentorsStatisticLeaderboardTableRow key={mentor?.id}
                                        index={(currenPage - 1) * limit + index + 1}
                                        mentor={getUserFullName(mentor)}
                                        avatar={mentor?.url}
                                        avarageRate={mentor?.rate}
                                    />
                                )}
                            />
                        </tbody>
                    </table>
                </>
            ) : (
                !isLoading && <EmptyData text="Sizda hozirda hech qanday ma'lumot mavjud emas." />
            )}
            {isLoading && <Loader size={80} />}
        </div>
    )
}

export default MentorsStatisticLeaderboard;