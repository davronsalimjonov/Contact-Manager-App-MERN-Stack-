import StudentsTableHeader from '../StudentsTableHeader';
import StudentsTableRow from '../StudentsTableRow';
import cls from './StudentsTable.module.scss';

const StudentsTable = () => {
    return (
        <table className={cls.table}>
            <StudentsTableHeader />
            <tbody>
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
                <StudentsTableRow />
            </tbody>
        </table>
    );
}

export default StudentsTable;