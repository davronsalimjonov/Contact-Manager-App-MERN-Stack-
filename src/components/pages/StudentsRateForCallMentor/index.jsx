import ServisStatisticTable from "@/components/templates/ServisStatisticTable";
import useGetStudentsRateForCallMentor from "@/hooks/useGetStudentsRateForCallMentor";
import { useOutletContext, useParams } from "react-router-dom";

const StudentsRateForCallMentor= () => {
    const [period] = useOutletContext();
    const {teacherId}=useParams();
    const { data: statistics, isLoading: isLoadingStatistics } = useGetStudentsRateForCallMentor(teacherId,{startDate:period.startDate, endDate:period.endDate});

    return (
        <ServisStatisticTable data={statistics} isLoading={isLoadingStatistics} headers={["№", "Dars o’tgan mentor ismi", "O’quvchilar baholari"]} />
    )
}

export default StudentsRateForCallMentor;