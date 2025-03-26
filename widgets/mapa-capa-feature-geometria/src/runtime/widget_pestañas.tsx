import React, { useEffect, useState } from 'react';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import Layer from "@arcgis/core/layers/Layer.js";
import SelectLayers from './components/select-layers';
import SelectFields from './components/select-fields';

interface WidgetProps {
    useMapWidgetIds?: string[];
}

const Widget: React.FC<WidgetProps> = (props) => {
    const [jimuMapView, setJimuMapView] = React.useState<JimuMapView | null>(null);

    const [layerSeleccionada, setLayerSeleccionada] = useState<Layer | null>(null);

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
          if(layerSeleccionada.declaredClass === "esri.layers.FeatureLayer"){
            console.log('Capa seleccionada:', layerSeleccionada.title, "Es una FeatureLayer");
          } else if(layerSeleccionada.declaredClass === "esri.layers.MapImageLayer"){
            console.log('Capa seleccionada:', layerSeleccionada.title, "Es una MapImageLayer");
          } else{
            console.log('Capa seleccionada:', layerSeleccionada.title, "Es de tipo no controlado");
          }

          console.log('Capa seleccionada:', layerSeleccionada.title, layerSeleccionada.id);
      }
      }, [layerSeleccionada]);


    return (
        <div>
            <JimuMapViewComponent 
                useMapWidgetId={props.useMapWidgetIds?.[0]} 
                onActiveViewChange={handleActiveViewChange} 
            />
            <SelectLayers jimuMapView={jimuMapView} onChange={(optionSelected: Layer) => setLayerSeleccionada(optionSelected)}></SelectLayers>
            <SelectFields layer={layerSeleccionada} onFieldSelect={function (fieldName: string): void { throw new Error('Function not implemented.');} }></SelectFields>
        </div>
    );
};

export default Widget;
