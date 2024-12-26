import Tabs from "@/components/UI/moleculs/Tabs";
import cls from './ServisStatistic.module.scss';
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ServisStatisticTable from "@/components/templates/ServisStatisticTable";
import useGetLessonServisStatistic from "@/hooks/useGetLessonServisStatistic";
import useGetCallServisStatistic from "@/hooks/useGetCallServisStatistic";

const options = [{ value: 'lesson', label: "Dars bo'yicha statistika" }, { value: 'call', label: "Call bo'yicha statistika" }]

const ServisStatistic = () => {
    const [activeTab, setActiveTab] = useState(options?.[0]?.value);

    const [filter, setFilter] = useState({
        page: 1,
        limit: 10,
    }
    );

    const [period] = useOutletContext();
    const { data: statistics, isLoading: isLoadingStatistics } = activeTab === 'lesson' ? useGetLessonServisStatistic({ startDate: period.startDate, endDate: period.endDate, ...filter }) : useGetCallServisStatistic({ startDate: period.startDate, endDate: period.endDate, ...filter });

    // TODO

    const onShowSizeChange = (current, pageSize) => {
        setFilter((prev) => {
            return {
                ...prev,
                page: current,
                limit: pageSize,
            }
        })
    };

    return (
        <>
            <div className={cls.content}>
                <Tabs
                    className={cls.form__tabs}
                    tabClassName={cls.form__tabs__btn}
                    activeTabClassName={cls.form__tabs__active}
                    options={options}
                    defaultValue={options?.[0]?.value}
                    onChange={setActiveTab}
                />

                {
                    activeTab === 'lesson' ? <ServisStatisticTable
                        activeTab="lesson"
                        data={statistics}
                        isLoading={isLoadingStatistics}
                        headers={["№", "Dars o’tgan mentor ismi", "Guruhi", "Dars o’rtacha statistikasi"]}
                    /> : <ServisStatisticTable
                        activeTab={"call"}
                        data={statistics}
                        isLoading={isLoadingStatistics}
                        headers={["№", "Telefon qilgan mentor ismi", "Call o’rtacha statistikasi"]}
                    />
                }
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

export default ServisStatistic;