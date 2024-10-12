import { Create, SimpleForm, TextInput, DateInput, NumberInput, SelectInput, ReferenceField,
    Show, SimpleShowLayout, TextField } from 'react-admin';

export const DonanteCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="nombre" />
            <TextInput source="apellido" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);

export const DonanteShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="nombre" />
            <TextField source="apellido" />
            <TextField source="email" />
            <ReferenceField label="Donaciones" source="id" reference="donaciones">
                <TextField source="cantidad" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);