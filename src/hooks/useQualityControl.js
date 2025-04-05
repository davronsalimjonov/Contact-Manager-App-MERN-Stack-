import { updateEmployee } from "@/services/employee"
import { createQualityControlEmployee, getQualityControlEmployees } from "@/services/qualityControl"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useGetQualityControlEmployees = (params = {}) => {
    return useQuery(['quality-control-employees', params], () => getQualityControlEmployees(params) )
}

export const useCreateQualityControlEmployeeMutation = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: createQualityControlEmployee,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess() {
        queryClient.invalidateQueries(['quality-control-employees'])
    }

    return createMutation
}

export const useUpdateQualityEmployeeMutation = () => {
    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: async (fd) => {
            const employeeId = fd.get('id')
            const role = fd.get('role')
            fd.delete('id')
            fd.delete('role')
            return await updateEmployee(employeeId, fd, {role})
        },
        onSuccess: onUpdateSuccess
    })

    function onUpdateSuccess(data) {
        const employeeId = data?.id
        queryClient.setQueriesData(['quality-control-employees', employeeId], (oldData) => ({ ...oldData, ...data }))
        queryClient.setQueriesData(['quality-control-employees'], (oldData) => ({
            ...oldData,
            items: oldData?.items?.map(item => item.id === employeeId ? data : item)
        }))
    }

    return updateMutation
}