import { EditIcon } from '../../atoms/icons';
import cls from './AllstudentsTableBody.module.scss';
import Button from '../../atoms/Buttons/Button';

const AllStudentsTableBody = ({
    students,
    setstudentId,
    setOpenModal
}) => {
    const currenPage = students?.meta?.currentPage;
    const limit = students?.meta?.itemsPerPage;

    const handleUpdate = (id) => {
        setstudentId(id);
        setOpenModal(true);
    }
// TODO
    return (
        <>
            <tbody>
                {
                    students?.items.map((student, index) => (
                        <tr key={student.id} className={cls.dictionary__row}>
                            <td className={cls.dictionary__row__td}>{(currenPage - 1) * limit + index + 1}</td>
                            <td className={cls.dictionary__row__td}>{student.firstName +" "+ student.lastName}</td>
                            <td className={cls.dictionary__row__td}>{student.phone}</td>
                            <td className={cls.dictionary__row__td}>{student.unit && `Unit ${student.unit}`}</td>
                            <td className={cls.dictionary__row__td}>{student.lvl}</td>
                            <td className={cls.dictionary__row__td}>
                                <Button className={cls.edit__button} onClick={()=>handleUpdate(student.id)} type='button'><EditIcon /></Button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </>
    )
}

export default AllStudentsTableBody;