import { cn } from '@/utils/lib';
import cls from './Table.module.scss';
import EmptyData from '../../organisms/EmptyData';

const Table = ({ columns = [], data = [], className }) => {
    const gridTemplate = columns.map(col => col.style?.width || `minmax(${100/columns.length/2}%, auto)`).join(" ");

    return (
        <div style={{ overflow: "auto", flexGrow: 1, display: "flex", flexDirection: "column" }}>
            {data?.length > 0 ? (
                <table
                    className={cn(cls.table, className)}
                    style={{ gridTemplateColumns: gridTemplate }}
                >
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={row.id || rowIndex}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <EmptyData />
            )}
        </div>
    );
};


export default Table;