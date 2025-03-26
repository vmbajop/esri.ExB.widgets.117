import React, { useEffect, useState } from 'react';
import Layer from '@arcgis/core/layers/Layer';

interface SelectFieldsProps {
    layer: Layer;
    onFieldSelect: (fieldName: string) => void;
}

const SelectFields: React.FC<SelectFieldsProps> = ({ layer, onFieldSelect }) => {
    const [fields, setFields] = useState<string[]>([]);

    useEffect(() => {
        if (layer && 'fields' in layer) {
            // @ts-ignore: Ensure the layer has fields property
            setFields(layer.fields.map((field: any) => field.name));
        }
    }, [layer]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFieldSelect(event.target.value);
    };

    return (
        <div>
            <label htmlFor="field-select">Select a field:</label>
            <select id="field-select" onChange={handleChange}>
                <option value="">-- Select a field --</option>
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectFields;