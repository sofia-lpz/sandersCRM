import { 
    Create, 
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
    SearchInput,
    NumberField,
    SimpleList
} from 'react-admin';
import { useMediaQuery, Theme } from "@mui/material";


import { Stack } from '@mui/material';
import { MyToolbar } from '../components/Donante_toolbar';

const validateNotEmpty = [required()];
const validateEmail = [email(), required()];

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DonantesExporter = (donantes) => {
    const currentDate = new Date().toLocaleDateString('es-MX');
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    
    doc.text(`Reporte de Donantes - Creado: ${currentDate}`, 10, 10);

    const tableColumns = ['ID', 'Nombre', 'Apellido', 'Email', 'Telefono', '# de Donaciones'];
    const tableRows = [];

    donantes.forEach((donante) => {
        const row = [
            donante.id.toString(),
            donante.nombre,
            donante.apellido,
            donante.email,
            donante.telefono,
            donante.donaciones,
        ];
        tableRows.push(row);
    });

    autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
    });

    doc.save('donantes_report.pdf');
};

const DonantesFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Numero de Donaciones" source="donaciones" />,
];

export const DonanteList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    return (
        <List filters={DonantesFilters} exporter={DonantesExporter}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.nombre}
                    secondaryText={(record) => record.apellido}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid>
                    <TextField label="ID" source="id" />
                    <TextField label="Nombre" source="nombre" />
                    <TextField label="Apellido" source="apellido" />
                    <TextField label="Email" source="email" />
                    <TextField label="Telefono" source="telefono" />
                    <NumberField label="# de Donaciones" source="donaciones" />
                </Datagrid>
            )}
        </List>
    );
};

export const DonanteCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput label="Nombre" source="nombre" validate={validateNotEmpty} aria-label="Nombre"/>
            <TextInput label="Apellido" source="apellido" validate={validateNotEmpty} aria-label="Apellido"/>
            <TextInput label="Email" source="email" validate={validateEmail} aria-label="Correo Electrónico"/>
            <TextInput label="Telefono" source="telefono" aria-label="Teléfono"/>
            <NumberField label="# de Donaciones" source="donaciones" aria-label="Número de Donaciones"/>
        </SimpleForm>
    </Create>
);

export const DonanteEdit = () => (
    <Edit>
        <SimpleForm toolbar={<MyToolbar />}>
            <TextInput label="Nombre" source="nombre" validate={validateNotEmpty} aria-label="Nombre"/>
            <TextInput label="Apellido" source="apellido" validate={validateNotEmpty} aria-label="Apellido"/>
            <TextInput label="Email" source="email" validate={validateEmail} aria-label="Correo Electrónico"/>
            <TextInput label="Telefono" source="telefono" aria-label="Teléfono"/>
        </SimpleForm>
    </Edit>
);

export const DonanteShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField label="ID" source="id" aria-label="ID"/>
            <TextField label="Nombre" source="nombre" aria-label="Nombre"/>
            <TextField label="Apellido" source="apellido" aria-label="Apellido"/>
            <TextField label="Email" source="email" aria-label="Correo Electrónico"/>
            <TextField label="Telefono" source="telefono" aria-label="Teléfono"/>
            <NumberField label="# de Donaciones" source="donaciones" aria-label="Número de Donaciones"/>
        </SimpleShowLayout>
    </Show>
);