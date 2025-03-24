import React, { useEffect, useState } from 'react';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import SelectLayers from './components/select-layers';

interface WidgetProps {
    useMapWidgetIds?: string[];
}

const Widget: React.FC<WidgetProps> = (props) => {
    const [jimuMapView, setJimuMapView] = React.useState<JimuMapView | null>(null);

    const [layerSeleccionada, setLayerSeleccionada] = useState(null);

    const handleActiveViewChange = (jmv: JimuMapView) => {
        setJimuMapView(jmv);
      };

      useEffect(() => {
        if (jimuMapView) {
          console.log('Mapa:', jimuMapView.view.map);
        }
      }, [jimuMapView]);

      //// Tener en cuenta: jimuMapView.view.map.layers.items[0].title

      useEffect(() => {
        if(layerSeleccionada){
          console.log('Capa seleccionada:', layerSeleccionada);
      }
      }, [layerSeleccionada]);


    return (
        <div>
            <JimuMapViewComponent 
                useMapWidgetId={props.useMapWidgetIds?.[0]} 
                onActiveViewChange={handleActiveViewChange} 
            />
            <SelectLayers jimuMapView={jimuMapView} onChange={(optionSelected: String) => setLayerSeleccionada(optionSelected)}></SelectLayers>
        </div>
    );
};

export default Widget;
