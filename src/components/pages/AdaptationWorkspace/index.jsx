import WorkspaceTable from '@/components/templates/WorkspaceTable';
import cls from './AdaptationWorkspace.module.scss';

const AdaptationWorkspace = () => {
    const workspaceColumns = [
        {
            id: '1',
            title: 'Yangi',
            color: 'rgba(18, 86, 219, 1)',
            items: []
        },
        {
            id: 's',
            title: 'Darajasi aniqlangan',
            color: 'rgba(3, 221, 50, 1)',
            items: []
        },
        {
            id: 'w',
            title: 'Adaptatsiya tugatildi',
            color: 'rgba(255, 196, 3, 1)',
            items: []
        },
        {
            id: 'g',
            title: 'Javob bermadi',
            color: 'rgba(255, 0, 0, 1)',
            items: []
        },
        {
            id: '7',
            title: 'Muammoli',
            color: 'rgba(130, 128, 255, 1)',
            items: [] 
        },
        {
            id: '8',
            title: 'Pauza',
            color: 'rgba(255, 52, 219, 1)',
            items: []
        }
    ]
    return (
        <WorkspaceTable
            columns={workspaceColumns}
        />

    );
}

export default AdaptationWorkspace;