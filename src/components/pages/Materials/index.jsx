import { useState } from 'react';
import toast from 'react-hot-toast';
import { getFileTypeFromUrl, objectToFormData } from '@/utils/lib';
import Loader from '@/components/UI/atoms/Loader';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import EmptyData from '@/components/UI/organisms/EmptyData';
import MaterialItem from '@/components/UI/moleculs/MaterialItem';
import MaterialFormModal from '@/components/UI/organisms/MaterialFormModal';
import ConfirmationModal from '@/components/UI/organisms/ConfirmationModal';
import MaterialPreviewModal from '@/components/UI/organisms/MaterialPreviewModal';
import { useGetMentorMaterials, useMaterialMutations } from '@/hooks/useMaterial';
import cls from './Materials.module.scss';

const Materials = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [editMaterialObj, setEditMaterialObj] = useState(null)
    const [deleteMaterialId, setDeleteMaterialId] = useState(null)
    const [previewMaterial, setPreviewMaterial] = useState({isOpen: false, material: null})
    const { createMaterialMutation, updateMaterialMutation, deleteMaterialMutation } = useMaterialMutations()
    const { data: materials, isLoading: isLoadingMaterials, ref } = useGetMentorMaterials()

    const handleCreateMaterial = async (data) => {
        const fd = objectToFormData(data)
        await createMaterialMutation.mutateAsync(fd, {
            onSuccess: () => {
                setIsOpenModal(false)
                toast.success('Material yaratildi')
            },
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    const handleSetMaterial = (material) => {
        material = Object.assign({}, material)
        material.file = { type: getFileTypeFromUrl(material.file?.url), name: material.file?.fileName, size: material.file?.size * 1024 }
        setEditMaterialObj(material)
    }

    const handleUpdateMaterial = async (data) => {
        const fd = objectToFormData({ ...data, id: editMaterialObj?.id })
        await updateMaterialMutation.mutateAsync(fd, {
            onSuccess: () => {
                setEditMaterialObj(null)
                toast.success('Material ozgartirildi')
            },
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    const handleDeleteMaterial = async (id) => {
        await deleteMaterialMutation.mutateAsync(id, {
            onSuccess: () => {
                setDeleteMaterialId(null)
                toast.success('Material o’chirildi')
            },
            onError: (res) => toast.error(res?.response?.data?.message || 'Xatolik yuz berdi')
        })
    }

    return (
        <div className={cls.page}>
            <MaterialPreviewModal
                isOpen={previewMaterial.isOpen}
                onClose={() => setPreviewMaterial(state => ({ ...state, isOpen: false}))}
                title={previewMaterial?.material?.title}
                description={previewMaterial?.material?.description}
                fileUrl={previewMaterial?.material?.file?.url}
                fileName={previewMaterial?.material?.file?.fileName}
            />
            <ConfirmationModal
                isOpen={Boolean(deleteMaterialId)}
                onClose={() => setDeleteMaterialId(null)}
                onConfirm={() => handleDeleteMaterial(deleteMaterialId)}
                onCancel={() => setDeleteMaterialId(null)}
            />
            <MaterialFormModal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                onSubmit={handleCreateMaterial}
            />
            {editMaterialObj && <MaterialFormModal
                isOpen
                isEditing
                defaultValues={editMaterialObj}
                onClose={() => setEditMaterialObj(null)}
                onSubmit={handleUpdateMaterial}
            />}
            <Button className={cls.page__btn} onClick={() => setIsOpenModal(true)}>
                <PlusIcon /> Qo’shish
            </Button>
            {isLoadingMaterials ? (
                <Loader />
            ) : (
                materials?.length > 0 ? (
                    <div className={cls.page__items}>
                        {materials?.map((item) => (
                            <MaterialItem
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                fileName={item.file?.fileName}
                                fileSize={item.file?.size}
                                fileUrl={item.file?.url}
                                onClickEdit={() => handleSetMaterial(item)}
                                onClickDelete={() => setDeleteMaterialId(item.id)}
                                onClickFile={() => setPreviewMaterial({isOpen: true, material: item})}
                            />
                        ))}
                        <div ref={ref}></div>
                    </div>
                ) : (
                    <EmptyData
                        image='/images/materials-image.svg'
                        text='Sizda hozirda hech qanday materials mavjud emas <br/> Qo’shish tugmasi orqali o’zingiz uchun dars jadvali tuzib olsangiz bo’ladi.'
                    />
                )
            )}
        </div>
    );
}

export default Materials;