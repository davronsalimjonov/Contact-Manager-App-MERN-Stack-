import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getUserFullName } from '@/utils/lib';
import WorkspaceCallCard from '../../moleculs/WorkspaceCallCard';
import cls from './WorkspaceColumn.module.scss';

const WorkspaceColumn = ({
    title = '',
    color = '',
    items = [],
    status = '',
}) => {
    return (
        <div className={cls.column}>
            <span className={cls.column__line} style={{ borderColor: color }}></span>
            <h2 className={cls.column__title}>{title}</h2>
            <Droppable droppableId={status}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cls.column__cards}
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item?.id}
                                draggableId={item?.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ ...provided.draggableProps.style, marginBottom: '16px' }}
                                    >
                                        <WorkspaceCallCard 
                                            fullName={getUserFullName(item?.student)}
                                            time={item?.time}
                                            status={status}
                                            group={item?.group}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default WorkspaceColumn;