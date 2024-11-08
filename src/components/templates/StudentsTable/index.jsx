import StudentsTableHeader from '../../UI/organisms/StudentsTableHeader';
import StudentsTableRow from '../../UI/organisms/StudentsTableRow';
import cls from './StudentsTable.module.scss';

const StudentsTable = () => {
    return (
        <div style={{ overflow: 'auto' }}>
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
        </div>
    );
}

export default StudentsTable;