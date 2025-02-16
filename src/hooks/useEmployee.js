import { useMutation, useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { getEmployeeById, updateEmployee } from "@/services/employee"

export const useGetEmployeeById = (employeeId, params = {}, options = {}) => {
    return useQuery(['employee', employeeId, ...Object.values(removeEmptyKeys(params))], () => getEmployeeById(employeeId, params), { cacheTime: Infinity, staleTime: Infinity, ...options })
}

export const useUpdateEmployeeMutation = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: async (fd) => {
            const employeeId = fd.get('id')
            fd.delete('id')
            return await updateEmployee(employeeId, fd)
        },
        onSuccess: onUpdateSuccess
    })

    function onUpdateSuccess(data) {
        const employeeId = data?.id
        queryClient.setQueriesData(['employee', employeeId], (oldData) => ({ ...oldData, ...data }))
        queryClient.setQueriesData(['all-mentors'], (oldData) => ({
            ...oldData,
            items: oldData?.items?.map(item => item.id === employeeId ? data : item)
        }))
    }

    return updateMutation
}