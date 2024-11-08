import { useState } from 'react';
import cls from './Tabs.module.scss';
import TabButton from '../../atoms/TabButton';

const Tabs = ({
    options = [],
    defaultValue,
}) => {
    const [activeTab, setActiveTab] = useState(defaultValue || options?.[0]?.value)

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