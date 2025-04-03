import { getQualityControlEmployees } from "@/services/qualityControl"
import { useQuery } from "react-query"

export const useGetQualityControlEmployees = (params = {}) => {
    return useQuery(['quality-control-employees', params], () => getQualityControlEmployees(params) )
}