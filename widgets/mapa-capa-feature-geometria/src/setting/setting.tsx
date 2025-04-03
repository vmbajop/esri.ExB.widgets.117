import { React } from 'jimu-core';
import type { AllWidgetSettingProps } from 'jimu-for-builder';
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components';
import { TextInput } from 'jimu-ui';

//const Setting: React.FC<AllWidgetSettingProps<any>> = (props) => {
const Setting = (props: AllWidgetSettingProps<any>) => {
  
  // Gestionar la selección del mapa
  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  };

  // Gestionar cambios en la URL del documento de ayuda
  const handleUrlChange = (value: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('urlDocumentoAyuda', value),
    });
  };

  // Gestionar cambios en el título del documento de ayuda
  const handleTitleChange = (value: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('tituloDocumentoAyuda', value),
    });
  };

  return (
    <div className="m-2">
      {/* Selector de mapa */}
      <MapWidgetSelector
        onSelect={onMapWidgetSelected}
        useMapWidgetIds={props.useMapWidgetIds}
      />

      {/* Configuración adicional */}
      <div className="mt-3">
        <label>URL del Documento de Ayuda:</label>
        <TextInput
          className="w-100"
          defaultValue={props.config.urlDocumentoAyuda}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label>Título del Documento de Ayuda:</label>
        <TextInput
          className="w-100"
          defaultValue={props.config.tituloDocumentoAyuda}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Setting;