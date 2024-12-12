import ServisStatisticTable from "@/components/templates/ServisStatisticTable";
import useGetStudentsRateForTeacher from "@/hooks/useGetStudentsRateForTeacher";
import { useOutletContext, useParams } from "react-router-dom";

const StudentsRateForTeacher= () => {
    const [period] = useOutletContext();
    const {teacherId,groupId}=useParams();
    const { data: statistics, isLoading: isLoadingStatistics } = useGetStudentsRateForTeacher(teacherId,groupId,{startDate:period.startDate, endDate:period.endDate});

    return (
        <ServisStatisticTable data={statistics} isLoading={isLoadingStatistics} headers={["№", "Dars o’tgan mentor ismi", "O’quvchilar baholari"]} />
    )
}

export default StudentsRateForTeacher;