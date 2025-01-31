import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import WorkspaceColumn from '@/components/UI/organisms/WorkspaceColumn';
import cls from './WorkspaceTable.module.scss';

const WorkspaceTable = ({
    columns = [],
    onChange,
    renderItem
}) => {
    const [statuses, setStatuses] = useState(columns);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        onChange?.({ source, destination, draggableId })
        setStatuses((prevStatuses) => {
            const sourceStatus = prevStatuses.find((status) => status.id === source.droppableId);
            const destinationStatus = prevStatuses.find((status) => status.id === destination.droppableId);

            if (!sourceStatus || !destinationStatus) return prevStatuses;

            const updatedSourceItems = Array.from(sourceStatus.items || []);
            const updatedDestinationItems = sourceStatus.id === destinationStatus.id
                ? updatedSourceItems
                : Array.from(destinationStatus.items || []);

            const [movedItem] = updatedSourceItems.splice(source.index, 1);

            updatedDestinationItems.splice(destination.index, 0, movedItem);

            return prevStatuses.map((status) => {
                if (status.id === source.droppableId) {
                    return { ...status, items: updatedSourceItems };
                }

                if (status.id === destination.droppableId) {
                    return { ...status, items: updatedDestinationItems };
                }

                return status;
            });
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={cls.table}>
                {statuses?.length > 0 && statuses?.map((status) => (
                    <WorkspaceColumn
                        key={status?.id}
                        title={status?.title}
                        color={status?.color}
                        items={status?.items}
                        status={status?.id}
                        renderItem={renderItem}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}

export default WorkspaceTable;