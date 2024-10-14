import { Filter, 
    useListContext,
    TextInput,
    ReferenceInput,
    AutocompleteInput,
    SelectInput,
    DateInput,
    RadioButtonGroupInput
} from 'react-admin';

export const DonacionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Pais" source="pais" />
        <ReferenceInput label="Donante" source="id_donante" reference="donantes">
            <AutocompleteInput optionText="nombre" />
        </ReferenceInput>
        <SelectInput label="Campaña" source="campana" choices={[
            { id: 'reproductiva', name: 'Salud Reproductiva' },
            { id: 'agua', name: 'Campaña de Agua' },
            { id: 'nutricion', name: 'Nutricion' }
        ]} />
        <DateInput label="Fecha Desde" source="fecha_gte" />
        <DateInput label="Fecha Hasta" source="fecha_lte" />
        <RadioButtonGroupInput label="Tipo" source="tipo" choices={[
            { id: 'digital', name: 'Digital' },
            { id: 'efectivo', name: 'Efectivo' }
        ]} />
    </Filter>
);