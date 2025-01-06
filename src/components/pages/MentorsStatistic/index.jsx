import Tabs from "@/components/UI/moleculs/Tabs";
import cls from './MentorsStatistic.module.scss';
import { useState } from "react";
import MentorsStatisticLeaderboard from "@/components/templates/MentorsStatisticLeaderboard";
import useGetCallAndLessonLeaderboard from "@/hooks/useGetCallAndLessonLeaderboard";
import { useOutletContext } from "react-router-dom";
import MentorsStatisticTable from "@/components/templates/MentorsStatisticTable";
import CallMentorsStatisticTable from "@/components/templates/CallMentorsStatisticTable";

const options = [{ value: 'lesson', label: "Dars bo'yicha statistika" }, { value: 'call', label: "Call bo'yicha statistika" }]

const MentorsStatistic = () => {
    const [activeTab, setActiveTab] = useState(options?.[0]?.value);
    const [period] = useOutletContext();

    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    }
    );

    const onShowSizeChange = (current, pageSize) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: current,
                limit: pageSize,
            }
        })
    };

    const { data: statistics, isLoading: isLoadingStatistics } = useGetCallAndLessonLeaderboard({ startDate: period.startDate, endDate: period.endDate, ...filter });
    return (
        <>
            <div className={cls.content}>
                <div className={cls.content__tabs}>
                    <Tabs
                        className={cls.form__tabs}
                        tabClassName={cls.form__tabs__btn}
                        activeTabClassName={cls.form__tabs__active}
                        options={options}
                        defaultValue={options?.[0]?.value}
                        onChange={setActiveTab}
                    />
{/* TODO add pagination */}
                    {
                        activeTab === 'lesson' ? <MentorsStatisticTable data={statistics} isLoading={isLoadingStatistics} /> : <CallMentorsStatisticTable data={statistics?.calls} isLoading={isLoadingStatistics} />
                    }
                </div>
                <MentorsStatisticLeaderboard data={statistics?.leaderboard} isLoading={isLoadingStatistics} />
            </div>

            {
                (statistics?.meta?.totalItems > 20) && <div className={cls.pagination}>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={filter.page}
                        defaultPageSize={filter.limit}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
                        onChange={(page) => {
                            setFilter((prev) => {
                                return {
                                    ...prev,
                                    page: page,
                                }
                            })
                        }}
                        total={statistics?.meta?.totalItems}
                    />
                </div>
            }
        </>
    )
}

export default MentorsStatistic;