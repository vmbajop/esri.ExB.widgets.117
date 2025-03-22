import React, { useEffect, useState } from 'react';
import { JimuMapView } from 'jimu-arcgis';

interface MapView {
    jimuMapView: JimuMapView;
}

const ListaCapasMap: React.FC<MapView> = ({ jimuMapView }) => {
    const [layers, setLayers] = useState<string[]>([]);

    useEffect(() => {
        if (jimuMapView && jimuMapView.view) {
            const mapLayers = jimuMapView.view.map.layers;
            const layerNames: string[] = [];
            mapLayers.forEach((layer) => {
                layerNames.push(layer.title);
            });
            setLayers(layerNames);
        }
    }, [jimuMapView]);

    return (
        <div>
            <h3>Lista de Capas del Mapa</h3>
            <ul>
                {layers.map((layerName, index) => (
                    <li key={index}>{layerName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListaCapasMap;