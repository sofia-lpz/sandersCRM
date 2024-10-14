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
    NumberField,
 } from 'react-admin';

 import { Stack } from '@mui/material';
 import { MyToolbar } from '../components/Donante_toolbar';

 const validateNotEmpty = [required()];
 const validateEmail = [email()];

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

 export const DonanteList = () => (
    <List filters={DonantesFilters} exporter={DonantesExporter}>
        <Datagrid>
            <TextField label="ID" source="id" />
            <TextField label="Nombre" source="nombre" />
            <TextField label="Apellido" source="apellido" />
            <TextField label="Email" source="email" />
            <TextField label="Telefono" source="telefono" />
            <NumberField label="# de Donaciones" source="donaciones" />
        </Datagrid>
    </List>
);

export const DonanteCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput label="Nombre" source="nombre" validate={validateNotEmpty}/>
            <TextInput label="Apellido" source="apellido" validate={validateNotEmpty}/>
            <TextInput label="Email" source="email" validate={validateEmail}/>
            <TextInput label="Telefono" source="telefono"/>
            <NumberField label="# de Donaciones" source="donaciones" />
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
            <NumberField label="# de Donaciones" source="donaciones" />
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
