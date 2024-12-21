import { getUserFullName } from '@/utils/lib';
import TaskTableRow from '@/components/UI/moleculs/TaskTableRow';
import cls from './TasksTable.module.scss';

const TasksTable = ({
    tasks = []
}) => {
    return (
        <table className={cls.table}>
            <thead className={cls.table__header}>
                <tr>
                    <th></th>
                    <th>Task</th>
                    <th>O’quvchi</th>
                    <th>Deadline</th>
                    <th>Guruhi</th>
                    <th>Darajasi</th>
                    <th>Statusi</th>
                </tr>
            </thead>
            <tbody className={cls.table__body}>
                {tasks?.length > 0 && tasks.map(task => (
                    <TaskTableRow 
                        key={task?.id}
                        title={task?.title}
                        studentFullName={getUserFullName(task?.userCourse?.user)}
                        deadline={task?.date}
                        group={task?.userCourse?.group?.title}
                        level={task?.userCourse?.level}
                        status={task?.userCourse?.status}
                        userCourseId={task?.userCourse?.id}
                        isCompleted={task?.isCompleted}
                        expired={!task?.isCompleted && (new Date(task?.date) < new Date())}
                        taskId={task?.id}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default TasksTable;