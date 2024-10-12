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
    Datagrid
 } from 'react-admin';

 const validateNotEmpty = [required()];
 const validateEmail = [email()];

export const DonanteCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput label="Nombre" source="nombre" validate={validateNotEmpty}/>
            <TextInput label="Apellido" source="apellido" validate={validateNotEmpty}/>
            <TextInput label="Email" source="email" validate={validateEmail}/>
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
        </SimpleShowLayout>
    </Show>
);

export const DonanteEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="Nombre" source="nombre" validate={validateNotEmpty}/>
            <TextInput label="Apellido" source="apellido" validate={validateNotEmpty}/>
            <TextInput label="Email" source="email" validate={validateEmail}/>
        </SimpleForm>
    </Edit>
);

export const DonanteList = () => (
    <List>
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="Nombre" source="nombre" />
            <TextField label="Apellido" source="apellido" />
            <TextField label="Email" source="email" />
        </Datagrid>
    </List>
);