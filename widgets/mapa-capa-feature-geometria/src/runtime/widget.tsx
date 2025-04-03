import React, { useEffect, useState } from 'react';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import Layer from "@arcgis/core/layers/Layer.js";
import SelectLayers from './components/select-layers';
import SelectFields from './components/select-fields';
import TabsComponent from './components/tabs-component';
import { IMConfig } from '../config';
import './css/widget.css';

/** Como el componente sólo admite una interfaz, creamos la de props del componente y añadimos, entre otras, las consignadas en el entorno de configuración (IMConfig) */
interface WidgetProps {
    useMapWidgetIds?: string[];
    config: IMConfig;
}

const Widget: React.FC<WidgetProps> = (props) => {

  /** Propiedad reactiva que controla el mapa activo (en este caso el primero) */
  const [jimuMapView, setJimuMapView] = React.useState<JimuMapView | null>(null);

  /** Propiedad reactiva que controla la capa seleccionada en el select de capas */
  const [layerSeleccionada, setLayerSeleccionada] = useState<Layer | null>(null);

  /** Función que controla el estado del mapa activo. Se dispara si cambia el mapa activo y por defecto, al inicio del widget */
  const handleActiveViewChange = (jmv: JimuMapView) => {
      setJimuMapView(jmv);
    };

  /** Este useEffect se ejecuta cuando el componente se monta y cuando cambia la propiedad jimuMapView.
   * En este caso, se utiliza para establecer el mapa activo y para obtener las capas del mapa.*/
  useEffect(() => {
    if (jimuMapView) {
      console.log('Mapa:', jimuMapView.view.map);
    }
  }, [jimuMapView]);

  /** Este useEffect se ejecuta cuando cambia la propiedad layerSeleccionada. 
   * En este caso, se utiliza para determinar el tipo de capa seleccionada y mostrar un mensaje en la consola.*/
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

  /** Definición de las pestañas que se mostrarán en el componente TabsComponent, conforme a lo indicado en la definición de la interfaz Tab de ese componente */
  const tabs = [
    {
      label: "Widget MCFG",
      content: (
        <div>
          <SelectLayers jimuMapView={jimuMapView} onChange={(optionSelected: Layer) => setLayerSeleccionada(optionSelected)}></SelectLayers>,
          <SelectFields layer={layerSeleccionada} onFieldSelect={function (fieldName: string): void { throw new Error('Function not implemented.');} }></SelectFields>
        </div>
      )
    },
    {
      label: "Ayuda",
      content: (
    <div className='tab-ayuda'> {/*style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >*/}
      <iframe 
        src={props.config.urlDocumentoAyuda || "https://www.google.es"}  
        /*style={{ width: '100%', height: '100%', border: 'none', flex:1 }} */
        className='iframe-ayuda'
        title={props.config.tituloDocumentoAyuda || "Ayuda"}>
      </iframe>
    </div>
      )
    }
  ];
  return (
      <div className='tabs-container'>
        {/* style={{ display: 'flex', flexDirection: 'column', height: '100%' }} */}
          <JimuMapViewComponent 
              useMapWidgetId={props.useMapWidgetIds?.[0]} 
              onActiveViewChange={handleActiveViewChange} 
          />
          <TabsComponent tabs={tabs}></TabsComponent> {/** Se pasa el array de pestañas al componente TabsComponent */}
      </div>
  );
};

export default Widget;