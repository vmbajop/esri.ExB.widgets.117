/* eslint-disable @typescript-eslint/semi */
import { AllWidgetProps, React } from 'jimu-core'
import SimpleButton from './components/simple-button';
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { useEffect, useState } from 'react';
import BotonInstanciaMapa from './components/boton-instancia-mapa';
import ListaCapasMap from './components/lista-capas';
import SelectCapasMap from './components/select-capas';

const Widget = (props: AllWidgetProps<any>) => {
  //region Estado del mapa
  const [jimuMapView, setJimuMapView] = useState<JimuMapView | null>(null);

  // Maneja el cambio de la vista activa del mapa
  const handleActiveViewChange = (jmv: JimuMapView) => {
    setJimuMapView(jmv);
  };

  // Efecto para realizar acciones cuando cambia el estado del mapa
  useEffect(() => {
    if (jimuMapView) {
      console.log('Mapa:', jimuMapView.view.map);
    }
  }, [jimuMapView]);
  //endregion

  

  //region Salida
  return (
    <div className="widget-demo jimu-widget m-2">
      <p>{props.label}</p>
      {/* Componente para vincular el widget con el mapa */}
      <JimuMapViewComponent 
        useMapWidgetId={props.useMapWidgetIds?.[0]} 
        onActiveViewChange={handleActiveViewChange} 
      />
      
      <SimpleButton label={'Botón componente'} mensaje={'Lanza un mensje jugando con componentes sencillos'}></SimpleButton>
      
      <BotonInstanciaMapa instanciMapView={jimuMapView}></BotonInstanciaMapa>

      <ListaCapasMap jimuMapView={jimuMapView}></ListaCapasMap>

      <SelectCapasMap jimuMapView={jimuMapView}></SelectCapasMap>
    </div>
  );
  //endregion
};

export default Widget;