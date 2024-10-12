import { Create, 
    SimpleForm, 
    TextInput, 
    SelectInput,
    List,
    Datagrid,
    TextField,
    Edit,
    Show,
    SimpleShowLayout,
    required,
} from 'react-admin';
import { useState } from 'react';

const validateNotEmpty = [required()];

const validatePasswordsMatch = (value: string, allValues: { password: string }) => {
    return value === allValues.password ? undefined : 'Passwords do not match';
};

export const UsuarioCreate = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <Create>
            <SimpleForm>
                <TextInput source="username" validate={validateNotEmpty}/>
                <SelectInput source="role" choices={[
                    { id: 'admin', name: 'Admin' },
                    { id: 'user', name: 'User' }
                ]} validate={validateNotEmpty}/>
                <TextInput 
                    source="password" 
                    type="password" 
                    validate={validateNotEmpty} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextInput 
                    source="confirmPassword" 
                    type="password" 
                    validate={[required(), validatePasswordsMatch]} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </SimpleForm>
        </Create>
    );
};

export const UsuarioList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="role" />
        </Datagrid>
    </List>
);

export const UsuarioEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="username" validate={validateNotEmpty}/>
            <SelectInput source="role" choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'user', name: 'User' }
            ]} validate={validateNotEmpty}/>
        </SimpleForm>
    </Edit>
);

export const UsuarioShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="role" />
        </SimpleShowLayout>
    </Show>
);