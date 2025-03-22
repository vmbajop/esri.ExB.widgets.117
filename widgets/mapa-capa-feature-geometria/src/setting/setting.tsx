import React from 'react';
import type { AllWidgetSettingProps } from 'jimu-for-builder';
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components';

const Setting: React.FC<AllWidgetSettingProps<any>> = (props) => {
  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds
    });
  };

  return (
    <div className="m-2">
      <MapWidgetSelector
        onSelect={onMapWidgetSelected}
        useMapWidgetIds={props.useMapWidgetIds}
      />
    </div>
  );
};

export default Setting;