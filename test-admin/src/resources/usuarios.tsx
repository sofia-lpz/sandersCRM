import { 
    Create, 
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
    RadioButtonGroupInput,
    SearchInput,
    SimpleList
} from 'react-admin';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Stack, useMediaQuery, Theme } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const validateNotEmpty = [required()];
const validatePasswordsMatch = (value: string, allValues: { password: string }) => {
    return value === allValues.password ? undefined : 'Passwords do not match';
};

const UsuariosExporter = (usuarios) => {
    const currentDate = new Date().toLocaleDateString('es-MX');
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    
    doc.text(`Reporte de usuarios CRM - Creado: ${currentDate}`, 10, 10);

    const tableColumns = ['ID', 'Nombre de Usuario', 'Rol'];
    const tableRows = [];

    usuarios.forEach((usuario) => {
        const row = [
            usuario.id.toString(),
            usuario.username,
            usuario.role,
        ];
        tableRows.push(row);
    });

    autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
    });

    doc.save('usuarios_report.pdf');
};

const UsuariosFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Nombre de Usuario" source="username" />,
    <RadioButtonGroupInput label="Role" source="role" choices={[
        { id: 'admin', name: 'Admin' },
        { id: 'user', name: 'User' }
    ]} />,
];


export const UsuarioList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    return (
        <List filters={UsuariosFilters} exporter={UsuariosExporter}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.username}
                    secondaryText={(record) => record.role}
                />
            ) : (
                <Datagrid>
                    <TextField label="ID" source="id" />
                    <TextField label="Username" source="username" />
                    <TextField label="Role" source="role" />
                </Datagrid>
            )}
        </List>
    );
};

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