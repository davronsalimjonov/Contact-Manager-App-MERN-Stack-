import { PlusIcon } from '@/components/UI/atoms/icons';
import Button from '@/components/UI/atoms/Buttons/Button';
import EmptyData from '@/components/UI/organisms/EmptyData';
import cls from './Materials.module.scss';

const Materials = () => {
    return (
        <div className={cls.page}>
            <Button className={cls.page__btn}>
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