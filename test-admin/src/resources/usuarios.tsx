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
    PasswordInput,
    FilterList,
    FilterListItem,
    CardContentInner,
    FilterButton,
    CreateButton,
    FilterForm,
    RadioButtonGroupInput,
    SearchInput,
} from 'react-admin';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Stack } from '@mui/material';

const validateNotEmpty = [required()];
const validatePasswordsMatch = (value: string, allValues: { password: string }) => {
    return value === allValues.password ? undefined : 'Passwords do not match';
};

const UsuariosFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Nombre de Usuario" source="username" />,
    <RadioButtonGroupInput label="Role" source="role" choices={[
        { id: 'admin', name: 'Admin' },
        { id: 'user', name: 'User' }
    ]} />,
];

export const UsuarioList = () => (
    <List filters={UsuariosFilters}>
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="Username" source="username" />
            <TextField label="Role" source="role" />
        </Datagrid>
    </List>
);

export const UsuarioCreate = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <Create>
            <SimpleForm>
                <TextInput label="Username" source="username" validate={validateNotEmpty}/>
                <SelectInput label="Role" source="role" choices={[
                    { id: 'admin', name: 'Admin' },
                    { id: 'user', name: 'User' }
                ]} validate={validateNotEmpty}/>
                <PasswordInput 
                    label="Password"
                    source="password" 
                    validate={validateNotEmpty} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordInput 
                    label="Confirm Password"
                    source="confirmPassword" 
                    validate={[required(), validatePasswordsMatch]} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </SimpleForm>
        </Create>
    );
};

const UsuarioFilterList = () => (
    <CardContentInner>
        <FilterList label="Role" icon={<PersonIcon />}>
            <FilterListItem label="Admin" value={{ role: 'admin' }} />
            <FilterListItem label="User" value={{ role: 'user' }} />
        </FilterList>
    </CardContentInner>
);

export const UsuarioEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="Username" source="username" validate={validateNotEmpty}/>
            <SelectInput label="Role" source="role" choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'user', name: 'User' }
            ]} validate={validateNotEmpty}/>
        </SimpleForm>
    </Edit>
);

export const UsuarioShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField label="ID" source="id" />
            <TextField label="Username" source="username" />
            <TextField label="Role" source="role" />
        </SimpleShowLayout>
    </Show>
);