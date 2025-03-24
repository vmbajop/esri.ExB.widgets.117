import React, { useEffect } from 'react';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import SelectLayers from './components/select-layers';

interface WidgetProps {
    useMapWidgetIds?: string[];
}

const Widget: React.FC<WidgetProps> = (props) => {
    const [jimuMapView, setJimuMapView] = React.useState<JimuMapView | null>(null);

    const handleActiveViewChange = (jmv: JimuMapView) => {
        setJimuMapView(jmv);
      };

      useEffect(() => {
        if (jimuMapView) {
          console.log('Mapa:', jimuMapView.view.map);
        }
      }, [jimuMapView]);

      //// Seguir por aquí: jimuMapView.view.map.layers.items[0].title


    return (
        <div>
            <JimuMapViewComponent 
                useMapWidgetId={props.useMapWidgetIds?.[0]} 
                onActiveViewChange={handleActiveViewChange} 
            />
            <SelectLayers jimuMapView={jimuMapView}></SelectLayers>
        </div>
    );
};

export default Widget;
