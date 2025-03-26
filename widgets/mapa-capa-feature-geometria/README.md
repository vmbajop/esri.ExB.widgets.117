
# Componente SelectLayer

## Componente SelectLayers

Se trata de un componente, desarrollado en forma Funcional (en vez de ser de clase) que especializa un Select para mostrar las capas de un mapa.

### Definición del Componete:

```jsx
    const SelectLayers = ({ jimuMapView, onChange }) => {
```
- **Props** (o parámetros de entrada) que debe enviar el componente padre (_el que llama a este componente_)
    
    - **jimuMapView**: Está esperando que se le pase un JimuMapView de `jimu-arcgis`
    - **onChange**: estará esperando un método onChange

### Como se entera el componente de las capas que tiene el mapa

```jsx
    useEffect(() => {
        if (!jimuMapView) return;
       
        updateLayersInMap();
        
        const handleLayerChanged = jimuMapView.view.map.layers.on('change', updateLayersInMap);   

        return () => {
            handleLayerChanged.remove();
        };

    }, [jimuMapView]);
```

Tenemos un `useEffect` escuchando los cambios en el `jimuMapView` que se ejecuta al montarse.
Al montarse, se ejecuta y:

- ejecuta el método `updateLayersInMap`
- crea el listener handleLayerChanged, por lo que mientras el ccomponente esté montado, al producirse un `layers.onChange` ejecuta también el método `updateLayersInMap`
- Cuando se desponta, se ejecuta el `return`, que quita el listener.

Este método `updateLayersInMap`:

```jsx
    const updateLayersInMap = () => {
        const mapLayers = jimuMapView.view.map.layers.toArray();
        setLayers(mapLayers);
    };
```

trabaja con la propiedad reactiva

```jsx
    const [layers, setLayers] = useState([]);
```
 
Establece la propiedad reactiva `layers`, que sencillamanete es un array, con las capas del mapa. Cada vez que pasa por el emétodo, vuelve a leer todas las capas del mapa y sobre escribe los valores introducidos con los nuevos detectados, de tal forma que si se añaden o se quitan capas la lista queda automáticamente modificada.

# El funcionamiento del compoente

## Selección y devolución de una Layer

El componente va a devolver un objeto que va a resultar ser una `Layer`

### Control de eventos en Componentes Personalizados:

#### 1. Forma general de activar eventos

En un principio se implementó así, que es la forma general de activar un evento de un componente cuando se personaliza, en este caso el `onChange`de un `select`normal en este `SelectLayers`personalizado: 

```jsx
    <select onChange={(e) => onChange && onChange(e.target.value)}>
```
Lo cual **permitía que el componente personalizado aceptase un evento `onChange`** que luego sería directamente usado y escrito en el Componente padre (en este caso, Widget.tsx). Desde el componente padre (`Widget.tsx`) se usaría así:

```jsx
    <SelectLayers 
        jimuMapView={jimuMapView} 
        onChange={(selectedLayerId) => {
            console.log('Capa seleccionada:', selectedLayerId);
            setLayerSeleccionada(selectedLayerId);
        }}
    ></SelectLayers>
```

#### 2. Forma personalizada en este componente

Sin embargo, esta forma no permitía recoger el valor de la capa seleccionada en el propio componente para ser devuelta directamente desde este, por lo que se hizo lo siguiente:

1. El render y la construcción del evento
Si se quiere que el componente soporte un método `onChange` para que pueda ser manejado desde `Widget.tsx`, hay que agregar una **prop** llamada onChange y vincularla al evento onChange del `<select>`:

```jsx
return (
        <select onChange={(e) => handleLayerChange(e.target.value)}>
            {layers.map((layer, index) => (
                <option key={index} value={layer.id}>
                    {layer.title + "-" + layer.id || `Layer ${index + 1}`}
                </option>
            ))}
        </select>
    );
```

2. El método que controla el evento:

```jsx
    const handleLayerChange = (layerId: string) => {
        const selectedLayer = layers.find((layer) => layer.id === layerId);
        if (onChange) {
            onChange(selectedLayer);
        }
    };
```
Este método funciona de forma sencilla: recibe un parámetro `String` (el id de la layer) y en el array de layers busca aquella que coincide y esto lo hace cada vez que se produce un `onChage`

**Funcionamiento de todo esto**:

La línea 

```jsx
    <select onChange={(e) => onChange && onChange(e.target.value)}>
```

define el comportamiento del evento `onChange` del elemento `<select>` en React. Aquí está la explicación detallada:

1. **`onChange`**:  
   Este es un evento de React que se dispara cuando el usuario selecciona una nueva opción en el `<select>`.

2. **`(e) =>`**:  
   Es una función flecha que actúa como manejador del evento. El parámetro `e` representa el evento que se dispara cuando el usuario cambia la selección.

3. **`onChange && onChange(e.target.value)`**:  
   - **`onChange`**: Es una prop que se pasa al componente `SelectLayers`. Se espera que sea una función proporcionada por el componente padre (por ejemplo, `Widget.tsx`).
   - **`onChange &&`**: Esta es una verificación para asegurarse de que la prop `onChange` no sea `undefined` o `null`. Si `onChange` no está definido, la expresión no ejecutará nada, evitando errores.
   - **`onChange(e.target.value)`**: Si `onChange` está definido, se llama a esta función y se le pasa el valor de la opción seleccionada (`e.target.value`).

4. **`e.target.value`**:  
   - `e.target` es una referencia al elemento HTML que disparó el evento (en este caso, el `<select>`).
   - `e.target.value` obtiene el valor de la opción seleccionada en el `<select>`.

<u>En resumen</u>:

Cuando el usuario selecciona una nueva opción en el `<select>`, esta línea:
- Verifica si la prop `onChange` está definida.
- Si está definida, llama a la función `onChange` proporcionada por el componente padre y le pasa el valor de la opción seleccionada (`e.target.value`).

Esto permite que el componente padre (como `Widget.tsx`) maneje el cambio de selección en el `<select>`. Por ejemplo, el componente padre podría actualizar un estado o realizar alguna acción basada en la capa seleccionada.


---


# Implementar pestañas

### CalciteTabs

Precisa importar esto desde Calcite:

```jsx
    import { CalciteTabs, CalciteTabNav, CalciteTabTitle, CalciteTab
        } from "@esri/calcite-components-react"
```

```jsx
    return (
        <CalciteTabs scale="m" layout="center" style={{ width: '100%', height: '100%' }}>
            <CalciteTabNav slot="title-group">
                <CalciteTabTitle>Widget Title</CalciteTabTitle>
                <CalciteTabTitle>Help Title</CalciteTabTitle>
            </CalciteTabNav>
            <CalciteTab>
                <div>
                    {/* Contenido de la primera pestaña */}
                </div>
            </CalciteTab>
            <CalciteTab>
                {/* Contenido de otra pestaña*/}
            </CalciteTab>
        </CalciteTabs>
    );
```

Este sería el contenido para que tenga una pestaña con ayuda, siendo `props.config.help_url` una propiedad de configuración a gestionar en la configuración del widget

```jsx
    <iframe
        src={props.config.help_url}
        style={{ width: '100%', height: '100%', border: 'none' }}
    ></iframe>
```

### HTML con CSS

```jsx
    return (
        <div>
            <div className="tabs">
                <button onClick={() => setActiveTab('Pestaña 1')}>Pestaña 1</button>
                <button onClick={() => setActiveTab('Pestaña 2')}>Pestaña 2</button>
            </div>
            <div className="tab-content">
                {activeTab === 'Pestaña 1' && <div>Contenido de Pestaña 1</div>}
                {activeTab === 'Pestaña 2' && <div>Contenido de Pestaña 2</div>}
            </div>
        </div>
    );
```

con el CSS

```css
    .tabs button {
        margin-right: 10px;
        padding: 5px;
        cursor: pointer;
    }
    .tab-content {
        margin-top: 10px;
    }
```

### Biblioteca externa, en este caso MATERIAL-UI

```jsx
    import { Tabs, Tab } from '@mui/material';
    import React, { useState } from 'react';

    return (
        <div>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Pestaña 1" />
                <Tab label="Pestaña 2" />
            </Tabs>
            {activeTab === 0 && <div>Contenido de Pestaña 1</div>}
            {activeTab === 1 && <div>Contenido de Pestaña 2</div>}
        </div>
    );
```

### BootStrap

```jsx
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'Pestaña 1' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Pestaña 1')}
                    >
                        Pestaña 1
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'Pestaña 2' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Pestaña 2')}
                    >
                        Pestaña 2
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === 'Pestaña 1' && <div>Contenido de Pestaña 1</div>}
                {activeTab === 'Pestaña 2' && <div>Contenido de Pestaña 2</div>}
            </div>
        </div>
    );
```

### Componente personalizado

```jsx
    const Tabs = ({ tabs, activeTab, onTabChange }) => (
        <div>
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <button key={index} onClick={() => onTabChange(tab)}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {activeTab && <div>{activeTab.content}</div>}
            </div>
        </div>
    );
```