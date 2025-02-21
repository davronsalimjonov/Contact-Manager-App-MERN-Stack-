import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { objectToFormData } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import LessonHomeworkForm from '@/components/UI/organisms/LessonHomeworkForm';
import { useGetLessonHomeTask, useUpdateLessonHomeTaskMutation } from '@/hooks/useLessons';
import cls from './UpdateLessonHomework.module.scss';

const UpdateLessonHomework = () => {
    const { homeTaskId } = useParams()
    const { data: homeTask, isLoading } = useGetLessonHomeTask(homeTaskId)
    const updateLessonHomeTaskMutation = useUpdateLessonHomeTaskMutation()

    const defaultValues = {
        title: homeTask?.title,
        description: homeTask?.description,
        files: homeTask?.lessonFiles?.map(file => ({ 
            id: file?.id,
            name: file?.fileName, 
            size: file?.size * 1024 
        }))
    }

    const updateHomeTask = async (data) => {
        const body = Object.assign({}, data)
        const deletedFiles = homeTask?.lessonFiles?.filter(file => !body.files.some(b => b.id == file?.id)).map(file => file?.id)
        
        body.id = homeTaskId
        body.files = body.files?.filter(file => !file?.id)   

        const fd = objectToFormData(body)
        if(deletedFiles?.length) fd.append('deletedFiles', JSON.stringify(deletedFiles))

        await updateLessonHomeTaskMutation.mutateAsync(fd, {
            onSuccess: () => toast.success('Muvaffaqiyatli yangilandi'),
            onError: (err) => toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return !isLoading ? (
        <LessonHomeworkForm 
            isEditing
            defaultValues={defaultValues} 
            onSubmit={updateHomeTask} 
        />
    ) : (
        <Loader />
    )
}

export default UpdateLessonHomework;