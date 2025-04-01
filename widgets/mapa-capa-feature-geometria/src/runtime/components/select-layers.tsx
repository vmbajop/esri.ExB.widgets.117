import React, { useEffect, useState } from 'react';

const SelectLayers = ({ jimuMapView, onChange }) => {
    
    /** variable reactiva para controlar las capas que hay en el mapa*/
    const [layers, setLayers] = useState([]);

    const updateLayersInMap = () => {
        const mapLayers = jimuMapView.view.map.layers.toArray();
        setLayers(mapLayers);
    };
    
    /** Función para controlar el cambio de Layer en el Select */
    const handleLayerChange = (layerId: string) => {
        const selectedLayer = layers.find((layer) => layer.id === layerId);
        if (onChange) {
            onChange(selectedLayer);
        }
    };

    useEffect(() => {
        if (!jimuMapView) return;

        /** nada más montarse el JimuMapView se ejecuta useEffect (ver [] de UseEffect abajo)
         *  y lo primero que hace es establecer el control de capas cargadas de este componente
         */
        updateLayersInMap();

        /** Listener para determinar si se ha cargado o quitado una capa y actualizar el array de capas */
        const handleLayerChanged = jimuMapView.view.map.layers.on('change', updateLayersInMap);   

        // Al desmontar el componenete JimuMapView se Limpia el listener
        return () => {
            handleLayerChanged.remove();
        };

    }, [jimuMapView]);

    return (
        <select onChange={(e) => handleLayerChange(e.target.value)}>
            {layers.map((layer, index) => (
                <option key={index} value={layer.id}>                      {/** Se envía layer.id porque handleLayerChange espera un string */}
                    {layer.title + "-" + layer.id || `Layer ${index + 1}`}
                </option>
            ))}
        </select>
    );
};

export default SelectLayers;