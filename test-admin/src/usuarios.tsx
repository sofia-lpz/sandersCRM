import { Create, 
    SimpleForm, 
    TextInput, 
    DateInput, 
    NumberInput, 
    SelectInput,
    List,
    Datagrid,
    TextField,
} from 'react-admin';

export const UsuarioCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="usuario" />
        </SimpleForm>
    </Create>
);

export const UsuarioList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
        </Datagrid>
    </List>
);

