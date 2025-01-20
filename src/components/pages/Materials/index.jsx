import { useState } from 'react';
import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import EmptyData from '@/components/UI/organisms/EmptyData';
import CreateMaterialModal from '@/components/UI/organisms/CreateMaterialModal';
import cls from './Materials.module.scss';

const Materials = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <div className={cls.page}>
            <CreateMaterialModal 
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
            />
            <Button className={cls.page__btn} onClick={() => setIsOpenModal(true)}>
                <PlusIcon /> Qo’shish
            </Button>
            <EmptyData 
                image='/images/materials-image.svg'
                text='Sizda hozirda hech qanday materials mavjud emas <br/> Qo’shish tugmasi orqali o’zingiz uchun dars jadvali tuzib olsangiz bo’ladi.'
            />
        </div>
    );
}

export default Materials;