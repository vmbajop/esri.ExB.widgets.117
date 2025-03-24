import React, { useEffect, useState } from 'react';

const SelectLayers = ({ jimuMapView }) => {
    
    /** variable reactiva para controlar las capas que hay en el mapa
     *  y función que modifica su contenido
     */
    const [layers, setLayers] = useState([]);

    const updateLayersInMap = () => {
        const mapLayers = jimuMapView.view.map.layers.toArray();
        setLayers(mapLayers);
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
        <select>
            {layers.map((layer, index) => (
                <option key={index} value={layer.id}>
                    {layer.title + "-" + layer.id || `Layer ${index + 1}`}
                </option>
            ))}
        </select>
    );
};

export default SelectLayers;