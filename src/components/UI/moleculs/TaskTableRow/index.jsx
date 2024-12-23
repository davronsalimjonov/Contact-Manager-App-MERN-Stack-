import { cn } from '@/utils/lib';
import { useTaskMutations } from '@/hooks/useTask';
import { formatMessageDate, getTimeFromDate } from '@/utils/time';
import StudentStatus from '../../atoms/StudentStatus';
import cls from './TaskTableRow.module.scss';

const TaskTableRow = ({
    title = '',
    studentFullName = '',
    deadline = '',
    group = '',
    level = '',
    status = '',
    isCompleted = false,
    expired = false,
    userCourseId = '',
    taskId = ''
}) => {
    const { statusChangeMutation } = useTaskMutations(userCourseId)

    return (
        <tr className={cn(cls.row, isCompleted && cls.completed, expired && cls.expired)}>
            <td>
                <input 
                    type="checkbox" 
                    onChange={() => statusChangeMutation.mutate(taskId)}
                    disabled={isCompleted}
                    defaultChecked={isCompleted} 
                />
            </td>
            <td>{title}</td>
            <td>{studentFullName}</td>
            <td>{formatMessageDate(deadline)}, {getTimeFromDate(deadline)}</td>
            <td>{group}</td>
            <td>{level}</td>
            <td><StudentStatus status={status} /></td>
        </tr>
    );
}

export default TaskTableRow;