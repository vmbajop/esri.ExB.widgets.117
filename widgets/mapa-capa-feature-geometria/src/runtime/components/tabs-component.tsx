import React, { useState } from 'react';
import "../css/tabs-component.css";

/** interface que define el contenido que ha de tener una tab:
 * label: string --> el texto que se verá en la pestaña
 * content: React.ReactNode --> el contenido que se verá al hacer click en la pestaña
 */
interface Tab {
    label: string;
    content: React.ReactNode;
}

/** interface que define un conjunto de pestañas como un objeto tabs formado de un array de tab */
interface TabsComponentProps {
    tabs: Tab[];
}

/** Como el componente sólo puede esperar una interfaz de propiedades, se le pasa la interfaz de Tabs (TabsComponentProps)
 * El componente esperará por tanto un array de n número de pestañas, cada una con su label y su contenido, como se ha definido en la interfaz Tab
 */
const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => {
    /** Propiedad reactiva que controla la pestaña activa en cada momento. Por defecto es 0, la primera */
    const [activeTab, setActiveTab] = useState(0);

    /** control de la propiedad reactiva activeTab que se dispara al hacer click en una pestaña */
    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };



    return (
        /** Contenedor principal. Organiza el componente entero en una columna */
        <div className='tabs-component-container'> {/*style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>*/}
            {/** Contenedor de las pestaña (tabs) */}
            <div className='unac-tab-container'> {/*style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>*/}
                {tabs.map((tab, index) => (
                    /** Elemento button que muestra la parte de arriba de las pestañas, sobre la que se hace click */
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)} /** Manejador para que el click cambie de pestaña activa */
                        /** se aplica una clase de forma condiciona: en principio la clase button-tab pero si la pestaña es la activa se le añade la clase active (.button-tab.active), que se define en el css
                        */
                        className={`button-tab ${activeTab === index ? 'active' : ''}`}> {/*style={{padding: '10px 20px', cursor: 'pointer', border: 'none', borderBottom: activeTab === index ? '2px solid blue' : 'none', backgroundColor: activeTab === index ? '#f0f0f0' : 'transparent',}}>*/}
                        {tab.label}
                    </button>
                ))}
            </div>
            {/** Contenedor de la pestaña activa */}
            <div className='ac-tab-container'> {/*style={{ flex: 1, overflow: 'auto', padding: '20px' }}>*/}
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default TabsComponent;