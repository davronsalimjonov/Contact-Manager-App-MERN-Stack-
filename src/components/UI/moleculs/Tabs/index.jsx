import { useState } from 'react';
import cls from './Tabs.module.scss';
import TabButton from '../../atoms/TabButton';

const Tabs = ({
    options = []
}) => {
    const [activeTab, setActiveTab] = useState()

    return (
        <div className={cls.tabs}>
            {options?.map(option => (
                <TabButton
                    key={option.value}
                    onClick={() => setActiveTab(option.value)}
                    isActive={activeTab === option.value}
                >
                    {option?.label}
                </TabButton>
            ))}
        </div>
    );
}

export default Tabs;