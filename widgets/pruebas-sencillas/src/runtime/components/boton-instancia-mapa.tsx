import { JimuMapView } from 'jimu-arcgis';
import { React, jsx } from 'jimu-core';
import { Button } from 'jimu-ui';

interface BotonInstanciaMapaProps {
    instanciMapView: JimuMapView | null;
}

const BotonInstanciaMapa: React.FC<BotonInstanciaMapaProps> = ({instanciMapView}) => {
    const clickHandle = () => {
        console.log('Botón pulsado con evento:');
        if (instanciMapView) {
        console.log('Instancia del mapa:', instanciMapView.view.map);
        } else {
        console.log('No hay un mapa disponible.');
        }
    }
    return (
        <Button type="primary" onClick={clickHandle}>
            Mostrar instancia del mapa           
        </Button>
    );
};

export default BotonInstanciaMapa;