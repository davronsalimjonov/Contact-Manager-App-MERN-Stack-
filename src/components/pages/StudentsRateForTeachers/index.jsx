import cls from './StudentsRateForTeacher.module.scss';
import useGetStudentsRateForTeacher from "@/hooks/useGetStudentsRateForTeacher";
import { Pagination } from "antd";
import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import StudentsRateTable from "@/components/templates/StudentsRateTable";
import { LeftArrowIcon, MentorIcon, StudentsIcon } from "@/components/UI/atoms/icons";
import { getUserFullName } from '@/utils/lib';

const StudentsRateForTeacher = () => {
    const [period] = useOutletContext();
    const { teacherId, groupId } = useParams();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    }
    );

    const { data: statistics, isLoading: isLoadingStatistics } = useGetStudentsRateForTeacher(teacherId, groupId, { start: period.startDate, end: period.endDate, page: pagination.page, limit: pagination.limit });

    const onShowSizeChange = (current, pageSize) => {
        setPagination((prev) => {
            return {
                ...prev,
                page: current,
                limit: pageSize,
            }
        })
    };
    return (
        <>
            <div className={cls.wrapper}>
                <div className={cls.path}>
                    <Link to={'/service-statistics'} className={cls.path__link}>Servis statistikasi</Link>
                    <LeftArrowIcon style={{ transform: "rotate(180deg)" }} color={"#9EA4B0"} />
                    <span >Dars bo’yicha statistika</span>
                </div>
                <div className={cls.header}>
                    <h2 className={cls.header__text}>O’quvchilar baholari</h2>
                    <div className={cls.header__content}>
                        <div className={cls.header__content__btn}>
                            <MentorIcon />
                            <p>{getUserFullName(statistics?.items[0]?.teacher)}</p>
                        </div>
                        <div className={cls.header__content__btn}>
                            <StudentsIcon />
                            <p>{statistics?.items[0]?.group?.title} guruh</p>
                        </div>

                    </div>
                </div>
                <StudentsRateTable pagination={pagination} data={statistics?.items} isLoading={isLoadingStatistics} headers={["№", "Sana", "Umumiy o'quvchilar soni", "Baholagan o'quvchilar soni", "O’quvchilar baholari"]} />
            </div>
            <div className={cls.pagination}>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={pagination.page}
                    defaultPageSize={pagination.limit}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} students`}
                    onChange={(page) => {
                        setPagination((prev) => {
                            return {
                                ...prev,
                                page: page,
                            }
                        })
                    }}
                    total={statistics?.meta?.totalItems}
                />
            </div>
        </>
    )
}

export default StudentsRateForTeacher;