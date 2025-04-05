import QualityControlEmployeeSettingsForm from '@/components/UI/organisms/QualityControlEmployeeSettingsForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEmployeeById } from '@/hooks/useEmployee'
import { EMPLOYEE_ROLES } from '@/constants/enum'
import toast from 'react-hot-toast'
import { objectToFormData } from '@/utils/lib'
import Loader from '@/components/UI/atoms/Loader'
import { useUpdateQualityEmployeeMutation } from '@/hooks/useQualityControl'

const QualityControlEmployeeSettings = () => {
    const { employeeId } = useParams()
    const updateQualityEmployee = useUpdateQualityEmployeeMutation()
    const { data: seller, isLoading } = useGetEmployeeById(employeeId, { role: EMPLOYEE_ROLES.QUALITY_CONTROLLER })
    const navigate = useNavigate()

    const defaultValues = {
        avatar: seller?.url,
        firstName: seller?.firstName,
        lastName: seller?.lastName,
        phone: seller?.phone,
        birthday: seller?.birthday,
        gender: String(seller?.gender),
        status: seller?.status,
    }

    const handleUpdateQualityEmployee = async (data) => {
        const updatedUserInfo = Object.assign({}, data)
        if (!(updatedUserInfo?.avatar instanceof File) && updatedUserInfo?.avatar !== null) delete updatedUserInfo.avatar
        const role = String(EMPLOYEE_ROLES.QUALITY_CONTROLLER)
        
        const fd = objectToFormData({id: employeeId, role , ...updatedUserInfo})


        await updateQualityEmployee.mutateAsync(fd, {
            onSuccess: () => {
                toast.success('Xodim ma`lumotlari o`zgartirildi')
                navigate(-1)
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message || 'Xatolik yuz berdi')
            }
        })
    }

    return (
        !isLoading ? (
            <QualityControlEmployeeSettingsForm
                defaultValues={defaultValues}
                onSubmit={handleUpdateQualityEmployee}
            />
        ) : (
            <Loader />
        )
    )
}

export default QualityControlEmployeeSettings