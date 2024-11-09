import { Draggable, Droppable } from 'react-beautiful-dnd';
import WorkspaceCard from '../../moleculs/WorkspaceCard';
import cls from './WorkspaceColumn.module.scss';

const WorkspaceColumn = ({
    title = '',
    color = '',
    items,
    id
}) => {
    return (
        <div className={cls.column}>
            <span className={cls.column__line} style={{ borderColor: color }}></span>
            <h2 className={cls.column__title}>{title}</h2>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cls.column__cards}
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item}
                                draggableId={item}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ ...provided.draggableProps.style, marginBottom: '16px' }}
                                    >
                                        <WorkspaceCard />
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