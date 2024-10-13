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
    SimpleShowLayout,
    ChipField,
    RadioButtonGroupInput,
    CreateButton,
    FilterButton,
    FilterForm,
    ListBase,
    Pagination,
    SearchInput
 } from 'react-admin';
 import { Stack } from '@mui/material';

const validateNotEmpty = [required()];
const validateCantidad = [required(), (value: number) => (value > 0 ? undefined : 'Cantidad must be greater than zero')];

const DonacionesFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Pais" source="pais" />,
    <ReferenceInput label="Donante" source="id_donante" reference="donantes">
        <AutocompleteInput optionText="nombre" />
    </ReferenceInput>,
    <SelectInput label="Campaña" source="campana" choices={[
        { id: 'reproductiva', name: 'Salud Reproductiva' },
        { id: 'agua', name: 'Campaña de Agua' },
        { id: 'nutricion', name: 'Nutricion' }
        ]} />,
    <DateInput label="Fecha Desde" source="fecha_gte" />,
    <DateInput label="Fecha Hasta" source="fecha_lte" />,
        <RadioButtonGroupInput label="Tipo" source="tipo" choices={[
            { id: 'digital', name: 'Digital' },
            { id: 'efectivo', name: 'Efectivo' }
        ]} />
];

const ListToolbar = () => (
    <Stack direction="row" justifyContent="space-between">
        <FilterForm filters={DonacionesFilters} />
        <FilterButton filters={DonacionesFilters} />
        <CreateButton />
    </Stack>
)

export const DonacionList = () => (
    <ListBase>
        <ListToolbar />
        <Datagrid>
            <TextField label="ID" source="id" />
            <ReferenceField label="Donante" source="id_donante" reference="donantes">
                <TextField source="nombre" />
            </ReferenceField>
            <ChipField label="Campaña" source="campana" />
            <DateField label="Fecha" source="fecha" />
            <NumberField label="Cantidad" source="cantidad" options={{ style: 'currency', currency: 'MXN' }}/>
            <TextField label="Tipo" source="tipo" />
            <TextField label="Estado" source="estado" />
            <TextField label="Pais" source="pais" />
        </Datagrid>
    </ListBase>
);

export const DonacionCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput label="Donante" source="id_donante" reference="donantes">
                <AutocompleteInput optionText="nombre" validate={validateNotEmpty}/>
            </ReferenceInput>
            <SelectInput label="Campaña" source="campana" choices={[
                { id: 'reproductiva', name: 'Salud Reproductiva' },
                { id: 'agua', name: 'Campaña de Agua' },
                { id: 'nutricion', name: 'Nutricion' }
            ]} validate={validateNotEmpty}/>
            <DateInput label="Fecha" source="fecha" validate={validateNotEmpty}/>
            <NumberInput label="Cantidad" source="cantidad" validate={validateCantidad} />
            <RadioButtonGroupInput label="Tipo" source="tipo" choices={[
                { id: 'digital', name: 'Digital' },
                { id: 'efectivo', name: 'Efectivo' }
            ]} validate={validateNotEmpty}/>
            <TextInput label="Estado" source="estado" />
            <TextInput label="Pais" source="pais" />
        </SimpleForm>
    </Create>
);

export const DonacionEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput label="Donante" source="id_donante" reference="donantes">
                <AutocompleteInput optionText="nombre" validate={validateNotEmpty}/>
            </ReferenceInput>
            <SelectInput label="Campaña" source="campana" choices={[
                { id: 'reproductiva', name: 'Salud Reproductiva' },
                { id: 'agua', name: 'Campaña de Agua' },
                { id: 'nutricion', name: 'Nutricion' }
            ]} validate={validateNotEmpty}/>
            <DateInput label="Fecha" source="fecha" validate={validateNotEmpty}/>
            <NumberInput label="Cantidad" source="cantidad" validate={validateCantidad} />
            <RadioButtonGroupInput label="Tipo" source="tipo" choices={[
                { id: 'digital', name: 'Digital' },
                { id: 'efectivo', name: 'Efectivo' }
            ]} validate={validateNotEmpty}/>
            <TextInput label="Estado" source="estado" />
            <TextInput label="Pais" source="pais" />
        </SimpleForm>
    </Edit>
);

export const DonacionShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField label="ID" source="id" />
            <ReferenceField label="Donante" source="id_donante" reference="donantes">
                <TextField source="nombre" />
            </ReferenceField>
            <ChipField label="Campaña" source="campana" />
            <DateField label="Fecha" source="fecha" />
            <NumberField label="Cantidad" source="cantidad" options={{ style: 'currency', currency: 'MXN' }}/>
            <TextField label="Tipo" source="tipo" />
            <TextField label="Estado" source="estado" />
            <TextField label="Pais" source="pais" />
        </SimpleShowLayout>
    </Show>
);