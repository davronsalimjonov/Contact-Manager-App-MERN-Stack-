import { useState } from 'react';
import Button from '@/components/UI/atoms/Buttons/Button';
import LessonScheduleCalendar from '@/components/templates/LessonScheduleCalendar';
import CreateScheduleFormModal from '@/components/UI/organisms/CreateScheduleFormModal';
import cls from './LessonPlan.module.scss';

const events = [
    {
        title: 'A2 level',
        start: new Date(2025, 1, 1, 10, 0),
        end: new Date(2025, 1, 1, 11, 30),
        color: 'rgba(206, 242, 203, 1)'
    },
    {
        title: 'A2 level',
        start: new Date(2025, 0, 27, 10, 0),
        end: new Date(2025, 0, 27, 11, 30),
        color: 'rgba(206, 242, 203, 1)'
    },
    {
        title: 'A2 level',
        start: new Date(2025, 0, 29, 10, 0),
        end: new Date(2025, 0, 29, 11, 30),
        color: 'rgba(206, 242, 203, 1)'
    },
    {
        title: '',
        start: new Date(2025, 0, 28, 14, 0),
        end: new Date(2025, 0, 28, 15, 30),
        color: 'rgba(255, 242, 242, 1)'
    },
    {
        title: '',
        start: new Date(2025, 0, 30, 14, 0),
        end: new Date(2025, 0, 30, 15, 30),
        color: 'rgba(255, 242, 242, 1)'
    },
    {
        title: '',
        start: new Date(2025, 0, 31, 14, 0),
        end: new Date(2025, 0, 31, 15, 30),
        color: 'rgba(255, 242, 242, 1)'
    }
];

const LessonPlan = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={cls.page}>
            <CreateScheduleFormModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <Button onClick={() => setIsOpen(true)}>Qo’shish</Button>
            <LessonScheduleCalendar
                events={events}
            />
            <Button>Saqlash</Button>
        </div>
    );
}

export default LessonPlan;