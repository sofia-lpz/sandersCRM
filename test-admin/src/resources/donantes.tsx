import { Create, 
    SimpleForm, 
    TextInput, 
    required,
    Edit,
    Show,
    SimpleShowLayout,
    TextField,
    email,
    List,
    Datagrid,
    Confirm,
    SearchInput,
    ReferenceInput,
    AutocompleteInput,
    SelectInput,
    DateInput,
    RadioButtonGroupInput,
    FilterForm,
    FilterButton,
    CreateButton,
    ListBase,
 } from 'react-admin';

 import { Stack } from '@mui/material';
 import { MyToolbar } from '../components/Donante_toolbar';

 const validateNotEmpty = [required()];
 const validateEmail = [email()];

 const DonantesFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Numero de Donaciones" source="donaciones" />,
];

const ListToolbar = () => (
    <Stack direction="row" justifyContent="space-between">
        <FilterForm filters={DonantesFilters} />
        <FilterButton filters={DonantesFilters} />
        <CreateButton />
    </Stack>
)

 export const DonanteList = () => (
    <ListBase>
        <ListToolbar />
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="Nombre" source="nombre" />
            <TextField label="Apellido" source="apellido" />
            <TextField label="Email" source="email" />
            <TextField label="Telefono" source="telefono" />
        </Datagrid>
    </ListBase>
);

export const DonanteCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput label="Nombre" source="nombre" validate={validateNotEmpty}/>
            <TextInput label="Apellido" source="apellido" validate={validateNotEmpty}/>
            <TextInput label="Email" source="email" validate={validateEmail}/>
            <TextInput label="Telefono" source="telefono"/>
        </SimpleForm>
    </Create>
);

export const DonanteShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField label="ID" source="id" />
            <TextField label="Nombre" source="nombre" />
            <TextField label="Apellido" source="apellido" />
            <TextField label="Email" source="email" />
            <TextField label="Telefono" source="telefono" />
        </SimpleShowLayout>
    </Show>
);

export const DonanteEdit = () => (
    <Edit>
        <SimpleForm toolbar={<MyToolbar />}>
            <TextInput label="Nombre" source="nombre" validate={validateNotEmpty}/>
            <TextInput label="Apellido" source="apellido" validate={validateNotEmpty}/>
            <TextInput label="Email" source="email" validate={validateEmail}/>
            <TextInput label="Telefono" source="telefono"/>
        </SimpleForm >
    </Edit>
);
