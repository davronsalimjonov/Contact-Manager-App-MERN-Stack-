import AllStudentsTableBody from "@/components/UI/organisms/AllStudentsTableBody";
import AllStudentsTableHeader from "@/components/UI/organisms/AllStudentsTableHeader";
import cls from './AllStudentsTable.module.scss';
import { useState } from "react";
// import UpdateWord from "@/components/UI/organisms/UpdateWord";

const AllStudentsTable = ({
    students
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [wordId, setWordId] = useState('');

    return (
        <>
            <table className={cls.AllStudents__table}>
                <AllStudentsTableHeader />
                <AllStudentsTableBody students={students} setWordId={setWordId} setOpenModal={setOpenModal}/>
            </table>

            {/*TODO {openModal && <UpdateWord openModal={openModal} closeModal={()=>setOpenModal(false)} wordId={wordId} />}  */}
        </>
    )
}

export default AllStudentsTable;