import { 
    Create, 
    SimpleForm, 
    TextInput, 
    DateInput, 
    NumberInput, 
    SelectInput, 
    ReferenceField, 
    AutocompleteInput, 
    ReferenceInput,
    required,
    Edit,
    Datagrid,
    DateField,
    List,
    NumberField,
    TextField,
    Show,
    SimpleShowLayout,
    ChipField,
    RadioButtonGroupInput,
    SearchInput,
    SimpleList,
} from 'react-admin';
import { useMediaQuery, Theme } from "@mui/material";

const validateNotEmpty = [required()];
const validateCantidad = [required(), (value: number) => (value > 0 ? undefined : 'Cantidad must be greater than zero')];

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DonacionesExporter = async (donaciones, fetchRelatedRecords) => {
    const currentDate = new Date().toLocaleDateString('es-MX');
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    
    doc.text(`Reporte de Donaciones - Creado: ${currentDate}`, 10, 10);

    const tableColumns = ['ID', 'Donante', 'Campaña', 'Fecha', 'Cantidad', 'Tipo', 'Estado', 'Pais'];
    const tableRows = [];

    const donantes = await fetchRelatedRecords(donaciones, 'id_donante', 'donantes');
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });

    donaciones.forEach((donacion) => {
        const donante = donantes[donacion.id_donante];
        const row = [
            donacion.id.toString(),
            donante ? donante.email : 'Error de registro',
            donacion.campana,
            donacion.fecha.slice(0, 10),
            formatter.format(donacion.cantidad),
            donacion.tipo,
            donacion.estado,
            donacion.pais,
        ];
        tableRows.push(row);
    });

    autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
    });

    // Save the PDF document
    doc.save('donaciones_report.pdf');
};

const DonacionesFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Pais" source="pais" />,
    <ReferenceInput label="Donante" source="id_donante" reference="donantes">
        <AutocompleteInput optionText="email" />
    </ReferenceInput>,
    <SelectInput label="Campaña" source="campana" choices={[
        { id: 'reproductiva', name: 'Salud Reproductiva' },
        { id: 'agua', name: 'Campaña de Agua' },
        { id: 'nutricion', name: 'Nutricion' },
        { id: 'sin campaña', name: 'Sin Campaña' },
    ]} />,
    <DateInput label="Fecha Desde" source="fecha_gte" />,
    <DateInput label="Fecha Hasta" source="fecha_lte" />,
    <RadioButtonGroupInput label="Tipo" source="tipo" choices={[
        { id: 'digital', name: 'Digital' },
        { id: 'efectivo', name: 'Efectivo' }
    ]} />
];

export const DonacionList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });
    return (
        <List filters={DonacionesFilters} exporter={DonacionesExporter}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => formatter.format(record.cantidad)}
                    secondaryText={(record) => record.campana}
                    tertiaryText={(record) => record.fecha.slice(0, 10)}
                />
            ) : (
                <Datagrid>
                    <TextField label="ID" source="id" />
                    <ReferenceField label="Donante" source="id_donante" reference="donantes">
                        <TextField source="email" />
                    </ReferenceField>
                    <ChipField label="Campaña" source="campana" />
                    <DateField label="Fecha" source="fecha" />
                    <NumberField label="Cantidad" source="cantidad" options={{ style: 'currency', currency: 'MXN' }}/>
                    <TextField label="Tipo" source="tipo" />
                    <TextField label="Estado" source="estado" />
                    <TextField label="Pais" source="pais" />
                </Datagrid>
            )}
        </List>
    );
};

export const DonacionCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput label="Donante" source="id_donante" reference="donantes">
                <AutocompleteInput optionText="email" validate={validateNotEmpty}/>
            </ReferenceInput>
            <SelectInput label="Campaña" source="campana" choices={[
                { id: 'reproductiva', name: 'Salud Reproductiva' },
                { id: 'agua', name: 'Campaña de Agua' },
                { id: 'nutricion', name: 'Nutricion' },
                { id: 'sin campaña', name: 'Sin Campaña' }
            ]} validate={validateNotEmpty}/>
            <DateInput label="Fecha" source="fecha" validate={validateNotEmpty}/>
            <NumberInput label="Cantidad" source="cantidad" validate={validateCantidad} />
            <RadioButtonGroupInput label="Tipo" source="tipo" choices={[
                { id: 'digital', name: 'Digital' },
                { id: 'efectivo', name: 'Efectivo' }
            ]} validate={validateNotEmpty}/>
            <TextInput label="Estado" source="estado" />
            <TextInput label="Pais" source="pais" />
        </SimpleForm>
    </Create>
);

export const DonacionEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput label="Donante" source="id_donante" reference="donantes">
                <AutocompleteInput optionText="email" validate={validateNotEmpty}/>
            </ReferenceInput>
            <SelectInput label="Campaña" source="campana" choices={[
                { id: 'reproductiva', name: 'Salud Reproductiva' },
                { id: 'agua', name: 'Campaña de Agua' },
                { id: 'nutricion', name: 'Nutricion' },
                { id: 'sin campaña', name: 'Sin Campaña' }
            ]} validate={validateNotEmpty}/>
            <DateInput label="Fecha" source="fecha" validate={validateNotEmpty}/>
            <NumberInput label="Cantidad" source="cantidad" validate={validateCantidad} />
            <RadioButtonGroupInput label="Tipo" source="tipo" choices={[
                { id: 'digital', name: 'Digital' },
                { id: 'efectivo', name: 'Efectivo' }
            ]} validate={validateNotEmpty}/>
            <TextInput label="Estado" source="estado" />
            <TextInput label="Pais" source="pais" />
        </SimpleForm>
    </Edit>
);

export const DonacionShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField label="ID" source="id" />
            <ReferenceField label="Donante" source="id_donante" reference="donantes">
                <TextField source="email" />
            </ReferenceField>
            <ChipField label="Campaña" source="campana" />
            <DateField label="Fecha" source="fecha" />
            <NumberField label="Cantidad" source="cantidad" options={{ style: 'currency', currency: 'MXN' }}/>
            <TextField label="Tipo" source="tipo" />
            <TextField label="Estado" source="estado" />
            <TextField label="Pais" source="pais" />
        </SimpleShowLayout>
    </Show>
);