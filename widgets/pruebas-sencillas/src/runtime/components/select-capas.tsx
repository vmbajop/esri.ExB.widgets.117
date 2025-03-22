import React, { useEffect, useState } from 'react';
import { JimuMapView } from 'jimu-arcgis';
import { Select } from 'jimu-ui';

interface MapView {
    jimuMapView: JimuMapView;
}

const SelectCapasMap: React.FC<MapView> = ({ jimuMapView }) => {
    const [layers, setLayers] = useState<string[]>([]);
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

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

    useEffect(() => {
        if (selectedLayer) {
            console.log('Capa seleccionada:', selectedLayer);
        }
    }, [selectedLayer]);

    const hadle_onChange_Select = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLayer(e.target.value);
    };

    return (
        <div>
            <h3>Lista de Capas del Mapa</h3>
            <Select value={selectedLayer} onChange={hadle_onChange_Select} style={{ width: '80%' }}>
                <option key="defect" value={null} disabled>
                    Seleccione una capa
                </option>
                {layers.map((layerName, i) => (
                    <option key={i} value={layerName}>
                        {layerName}
                    </option>
                ))};
            </Select>
        </div>
    );
};

export default SelectCapasMap;