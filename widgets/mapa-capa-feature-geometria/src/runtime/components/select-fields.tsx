import React, { useEffect, useState } from 'react';
import Layer from '@arcgis/core/layers/Layer';

/** interface para controlar dos propiedades de entrada que tendrá el componente, como parámetros de entrada: 
 * La capa de la que leer lo campos
 * La posibilidad de crear un evento cuando se cambie el Option seleccionado en el Select */
interface SelectFieldsProps {
    layer: Layer;
    onFieldSelect: (fieldName: string) => void;
}

const SelectFields: React.FC<SelectFieldsProps> = ({ layer, onFieldSelect }) => {
    
    /** Variable reactiva para controlar los campos presentes en la capa */
    const [fields, setFields] = useState<string[]>([]);

    /** Este useEffect se ejecuta cada vez que la dependencia 'layer' cambia. 
     * Si la capa tiene una propiedad 'fields', se extraen los nombres de los campos y se actualiza el estado 'fields'.
    */
    useEffect(() => {
        if (layer && 'fields' in layer) {
            // @ts-ignore: Asegura que la capa tiene la propiedad fields
            setFields(layer.fields ? layer.fields.map((field: any) => field.name) : []);
        }
    }, [layer]);

    /** Función que se lanza cuando se produce el evento onChange en el Select */
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFieldSelect(event.target.value);
    };

    return (
        <div>
            <label htmlFor="field-select">Select a field:</label>
            <select id="field-select" onChange={handleChange}>
                <option value="">-- Select a field --</option> {/** Opción por defecto */}
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