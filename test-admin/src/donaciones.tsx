import { Create, SimpleForm, TextInput, DateInput, NumberInput, SelectInput } from 'react-admin';

export const DonacionCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id_usuario" />
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