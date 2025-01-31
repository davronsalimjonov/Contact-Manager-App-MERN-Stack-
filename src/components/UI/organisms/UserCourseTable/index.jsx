import { useState } from 'react';
import UserCourseRow from '../../moleculs/UserCourseRow';
import GroupPickerModal from '../GroupPickerModal';
import ConfirmationModal from '../ConfirmationModal';
import cls from './UserCourseTable.module.scss';

const UserCourseTable = ({
}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenCofirmModal, setIsOpenConfirmModal] = useState(false)

    return (
        <>
            <ConfirmationModal 
                title={`Rostan ${isOpenCofirmModal} guruhga biriktirmoqchimisiz?`}
                isOpen={isOpenCofirmModal} 
                onClose={() => setIsOpenConfirmModal(false)}
                onConfirm={() => setIsOpenConfirmModal(false)}
            />
            <GroupPickerModal 
                isOpen={isOpenModal} 
                onClose={() => setIsOpenModal(false)}
                onChooseGroup={(group) => (setIsOpenModal(false), setIsOpenConfirmModal(group))}
            />
            <div className={cls.card}>
                <h3 className={cls.card__title}>Kurs</h3>
                <table className={cls.card__table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Kurs nomi</th>
                            <th>Sotib olgan sana</th>
                            <th>Tugash sanasi</th>
                            <th>Darajasi</th>
                            <th>Guruh</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserCourseRow
                            onClickAddCourse={() => setIsOpenModal(true)}
                        />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserCourseTable;