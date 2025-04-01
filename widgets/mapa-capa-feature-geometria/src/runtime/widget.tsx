import React, { useEffect, useState } from 'react';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import Layer from "@arcgis/core/layers/Layer.js";
import SelectLayers from './components/select-layers';
import SelectFields from './components/select-fields';
import TabsComponent from './components/tabs-component';

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

      const tabs = [
        {
          label: "Seleccionar Capas",
          content: (
            <div>
              <SelectLayers jimuMapView={jimuMapView} onChange={(optionSelected: Layer) => setLayerSeleccionada(optionSelected)}></SelectLayers>,
              <SelectFields layer={layerSeleccionada} onFieldSelect={function (fieldName: string): void { throw new Error('Function not implemented.');} }></SelectFields>
            </div>
          )
        },
        {
          label: "Hola Mundo",
          content: (
        <div>
          <iframe 
            src="https://developers.arcgis.com/experience-builder/guide/getting-started-widget/" 
            style={{ width: '100%', height: '500px', border: 'none' }} 
            title="ExB">
          </iframe>
        </div>
          )
        }
      ];
    return (
        <div>
            <JimuMapViewComponent 
                useMapWidgetId={props.useMapWidgetIds?.[0]} 
                onActiveViewChange={handleActiveViewChange} 
            />
            <TabsComponent tabs={tabs}></TabsComponent>
        </div>
    );
};

export default Widget;