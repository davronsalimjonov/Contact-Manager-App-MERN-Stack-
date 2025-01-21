import { useMutation, useQueryClient } from "react-query"
import { createMaterial, deleteMaterial, getMentorMaterials, updateMaterial } from "@/services/materials"
import { useGetUserId } from "./useGetUser"
import useScrollPagination from "./useScrollPagination"

export const useMaterialMutations = () => {
    const userId = useGetUserId()
    const queryClient = useQueryClient()
    const createMaterialMutation = useMutation({ mutationFn: createMaterial, onSuccess: onCreateMaterialSuccess })
    const deleteMaterialMutation = useMutation({ mutationFn: deleteMaterial, onSuccess: onDeleteMaterialSuccess })
    const updateMaterialMutation = useMutation({
        mutationFn: async (data) => {
            const id = data.get('id')
            data.delete('id')
            return await updateMaterial(id, data)
        },
        onSuccess: onUpdateMaterialSuccess
    })

    function onCreateMaterialSuccess(newFile) {
        queryClient.invalidateQueries(['materials', userId], oldData => {
            oldData.pages[0].items = [newFile, ...oldData.pages[0].items]
            return oldData
        })
    }

    function onDeleteMaterialSuccess(_, id) {
        console.log(id);
        
        queryClient.setQueryData(['materials', userId], (oldData) => {
            return {
                ...oldData,
                pages: oldData.pages.map(page => ({
                    ...page,
                    items: page.items.filter(item => item.id !== id)
                }))
            }
        })
    }

    function onUpdateMaterialSuccess(newFile) {
        queryClient.setQueryData(['materials', userId], (oldData) => {
            return {
                ...oldData,
                pages: oldData.pages.map(page => ({
                    ...page,
                    items: page.items.map(item => item.id === newFile.id ? newFile : item)
                }))
            }
        })
    }

    return {
        createMaterialMutation,
        updateMaterialMutation,
        deleteMaterialMutation
    }
}

export const useGetMentorMaterials = () => {
    const userId = useGetUserId()
    return useScrollPagination(
        ['materials', userId],
        ({ pageParams = 1 }) => getMentorMaterials(userId, { limit: 24, page: pageParams }),
        { cacheTime: Infinity, staleTime: Infinity }
    )
}