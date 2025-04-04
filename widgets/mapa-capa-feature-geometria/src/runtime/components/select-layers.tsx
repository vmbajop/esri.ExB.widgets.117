import React, { useEffect, useState } from 'react';

const SelectLayers = ({ jimuMapView, onChange }) => {
    
    /** variable reactiva para controlar las capas que hay en el mapa*/
    const [layers, setLayers] = useState([]);

    /** Función para controlar el valor de la propiedad reactiva layers */
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

    /** En este effect se controla el montaje de JimuMapView (ver abajo []) */
    useEffect(() => {
        if (!jimuMapView) return;

        /** Lo primero que hace es establecer el control de capas cargadas en el mapa actualizando la propiedad reactiva Layers: UseEffect --> updateLayersInMap --> setLayers */
        updateLayersInMap();

        /** en el montaje se crea este Listener para determinar si se ha cargado o quitado una capa y actualizar el array de capas (propiedad reactiva Layers) */
        const handleLayerChanged = jimuMapView.view.map.layers.on('change', updateLayersInMap);   

        // Al desmontar el componenete JimuMapView, se Limpia el Listener
        return () => {
            handleLayerChanged.remove();
        };

    }, [jimuMapView]);

    return (
        <div>
            <label htmlFor="layer-select">Select a Layer: </label>
            <select id='layer-select' onChange={(e) => handleLayerChange(e.target.value)}>
                <option value="">-- Select a Layer --</option> {/** Opción por defecto */}
                {layers.map((layer, index) => (
                    <option key={index} value={layer.id}>                      {/** Se envía layer.id porque handleLayerChange espera un string, por eso el value = string en vez de a esri.Layers.Layer */}
                        {layer.title + "-" + layer.id || `Layer ${index + 1}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectLayers;