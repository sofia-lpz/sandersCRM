import { Create, 
    SimpleForm, 
    TextInput, 
    DateInput, 
    NumberInput, 
    SelectInput, 
    ReferenceField, 
    AutocompleteInput, 
    ReferenceInput,
    required,
    Edit,
    Datagrid,
    DateField,
    List,
    NumberField,
    TextField,
    Show,
    SimpleShowLayout
 } from 'react-admin';

const validateNotEmpty = [required()];
const validateCantidad = [required(), (value: any) => (value > 0 ? undefined : 'Cantidad must be greater than zero')];

// TODO: ADD VALIDATION FOR CANTIDAD THAT WORKS

export const DonacionCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput label="Donante" source="id_donante" reference="donantes">
                <AutocompleteInput optionText="nombre" validate={validateNotEmpty}/>
            </ReferenceInput>
            <SelectInput source="campana" choices={[
                { id: 'reproductiva', name: 'Salud Reproductiva' },
                { id: 'agua', name: 'Campaña de Agua' },
                { id: 'nutricion', name: 'Nutricion' }
            ]} validate={validateNotEmpty}/>
            <DateInput source="fecha" validate={validateNotEmpty}/>
            <NumberInput source="cantidad" validate={validateCantidad} />
            <SelectInput source="tipo" choices={[
                { id: 'digital', name: 'Digital' },
                { id: 'efectivo', name: 'Efectivo' }
            ]} validate={validateNotEmpty}/>
            <TextInput source="estado" />
            <TextInput source="pais" />
        </SimpleForm>
    </Create>
);

export const DonacionEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput label="Donante" source="id_donante" reference="donantes">
                <AutocompleteInput optionText="nombre" validate={validateNotEmpty}/>
            </ReferenceInput>
            <SelectInput source="campana" choices={[
                { id: 'reproductiva', name: 'Salud Reproductiva' },
                { id: 'agua', name: 'Campaña de Agua' },
                { id: 'nutricion', name: 'Nutricion' }
            ]} validate={validateNotEmpty}/>
            <DateInput source="fecha" validate={validateNotEmpty}/>
            <NumberInput source="cantidad" validate={validateNotEmpty}/>
            <SelectInput source="tipo" choices={[
                { id: 'digital', name: 'Digital' },
                { id: 'efectivo', name: 'Efectivo' }
            ]} validate={validateNotEmpty}/>
            <TextInput source="estado" />
            <TextInput source="pais" />
        </SimpleForm>
    </Edit>
);

export const DonacionList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField label="Donante" source="id_donante" reference="donantes">
                <TextField source="nombre" />
            </ReferenceField>
            <DateField source="fecha" />
            <NumberField source="cantidad" />
            <TextField source="tipo" />
            <TextField source="estado" />
            <TextField source="pais" />
        </Datagrid>
    </List>
);

export const DonacionShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField label="Donante" source="id_donante" reference="donantes">
                <TextField source="nombre" />
            </ReferenceField>
            <DateField source="fecha" />
            <NumberField source="cantidad" />
            <TextField source="tipo" />
            <TextField source="estado" />
            <TextField source="pais" />
        </SimpleShowLayout>
    </Show>
);
