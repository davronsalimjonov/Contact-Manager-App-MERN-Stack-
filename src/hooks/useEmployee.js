import { useMutation, useQuery, useQueryClient } from "react-query"
import { removeEmptyKeys } from "@/utils/lib"
import { createMentorEmployee, getEmployeeById, updateEmployee, updateSeller } from "@/services/employee"

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

export const useCreateMentorEmployeeMutation = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: createMentorEmployee,
        onSuccess: onCreateSuccess
    })

    function onCreateSuccess() {
        queryClient.invalidateQueries(['all-mentors'])
    }

    return createMutation
}

export const useUpdateSellerMutation = () => {
    const queryClient = useQueryClient()
    const updateSellerMutation = useMutation({
        mutationFn: ({ id, body, params }) => updateSeller(id, body, params),
        onSuccess: onUpdateSuccess
    })

    function onUpdateSuccess(updatedData) {
        const sellerId = updatedData?.id
        queryClient.setQueriesData(['employee', sellerId], oldData => ({ ...oldData, ...updatedData }))
    }

    return updateSellerMutation
}