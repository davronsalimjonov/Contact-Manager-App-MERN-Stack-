import toast from 'react-hot-toast';
import { objectToFormData } from '@/utils/lib';
import MentorInformationForm from '@/components/UI/organisms/MentorInformationForm';
import { useCreateMentorEmployeeMutation } from '@/hooks/useEmployee';

const CreateMentor = () => {
    const createMentorEmployee = useCreateMentorEmployeeMutation()

    const handleCreateMentor = async (data) => {
        const fd = objectToFormData(data)
        await createMentorEmployee.mutateAsync(fd, {
            onSuccess: () => toast.success('Mentor muvaffaqiyatli qo\'shildi'),
            onError: () => toast.error('Mentor qo\'shishda xatolik yuz berdi')
        })
    }

    return (
        <MentorInformationForm 
            isCreate
            onSubmit={handleCreateMentor} 
        />
    );
}

export default CreateMentor;