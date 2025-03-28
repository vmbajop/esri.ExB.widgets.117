import React, { useState } from 'react';

interface Tab {
    label: string;
    content: React.ReactNode;
}

interface TabsComponentProps {
    tabs: Tab[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        style={{padding: '10px 20px', cursor: 'pointer', border: 'none', borderBottom: activeTab === index ? '2px solid blue' : 'none', backgroundColor: activeTab === index ? '#f0f0f0' : 'transparent',}}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ padding: '20px' }}>
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default TabsComponent;