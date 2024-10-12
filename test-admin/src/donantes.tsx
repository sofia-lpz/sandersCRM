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
            <TextInput source="nombre" validate={validateNotEmpty}/>
            <TextInput source="apellido" validate={validateNotEmpty}/>
            <TextInput source="email" validate={validateEmail}/>
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
        </SimpleShowLayout>
    </Show>
);

export const DonanteEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="nombre" validate={validateNotEmpty}/>
            <TextInput source="apellido" validate={validateNotEmpty}/>
            <TextInput source="email" validate={validateEmail}/>
        </SimpleForm>
    </Edit>
);

export const DonanteList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="nombre" />
            <TextField source="apellido" />
            <TextField source="email" />
        </Datagrid>
    </List>
);