import { Create, SimpleForm, TextInput, DateInput, NumberInput, SelectInput, ReferenceField } from 'react-admin';

export const DonacionCreate = () => (
    <Create>
        <SimpleForm>
            <DateInput source="fecha" />
            <NumberInput source="cantidad" />
            <SelectInput source="tipo" choices={[
                { id: 'digital', name: 'Digital' },
                { id: 'efectivo', name: 'Efectivo' },
                { id: 'especie', name: 'Especie' },
            ]} />
            <TextInput source="estado" />
            <TextInput source="pais" />
        </SimpleForm>
    </Create>
);

import { Datagrid, DateField, List, NumberField, TextField } from 'react-admin';

export const DonacionList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <DateField source="fecha" />
            <NumberField source="cantidad" />
            <TextField source="tipo" />
            <TextField source="estado" />
            <TextField source="pais" />
            <ReferenceField label="Donante" source="id_donante" reference="donantes">
                <TextField source="nombre" />
            </ReferenceField>
        </Datagrid>
    </List>
);

import { Show, SimpleShowLayout } from 'react-admin';

export const DonacionShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <DateField source="fecha" />
            <NumberField source="cantidad" />
            <TextField source="tipo" />
            <TextField source="estado" />
            <TextField source="pais" />
        </SimpleShowLayout>
    </Show>
);

import { Edit } from 'react-admin';

export const DonacioneEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <NumberInput source="id_usuario" />
            <DateInput source="fecha" />
            <NumberInput source="cantidad" />
            <TextInput source="tipo" />
            <TextInput source="estado" />
            <TextInput source="pais" />
        </SimpleForm>
    </Edit>
);