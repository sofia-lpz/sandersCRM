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
    Confirm
 } from 'react-admin';

 import { MyToolbar } from './Donante_toolbar';

 const validateNotEmpty = [required()];
 const validateEmail = [email()];

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

export const DonanteList = () => (
    <List>
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="Nombre" source="nombre" />
            <TextField label="Apellido" source="apellido" />
            <TextField label="Email" source="email" />
            <TextField label="Telefono" source="telefono" />
        </Datagrid>
    </List>
);