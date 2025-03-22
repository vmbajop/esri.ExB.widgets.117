import React from 'react'
import type { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'

export default class Setting extends React.PureComponent<AllWidgetSettingProps<any>, any> {  
  /* const onSelect = () => {
    this.props.onSettingChange({
      id: this.props.id
    })
  } */

  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  render() {
    return (
      <div className="m-2">
        <MapWidgetSelector onSelect={this.onMapWidgetSelected} useMapWidgetIds={this.props.useMapWidgetIds}/>
      </div>
    )
  }
}
