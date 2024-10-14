import { Button, useNotify, useDataProvider } from 'react-admin';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GeneratePdfButton = () => {
    const dataProvider = useDataProvider();
    const notify = useNotify();

    const handleGeneratePdf = async () => {
        try {
            // Fetch data from the "donaciones" resource
            const { data: donaciones } = await dataProvider.getList('donaciones', {
                pagination: { page: 1, perPage: 100 }, // Adjust pagination as needed
                sort: { field: 'id', order: 'ASC' },
                filter: {},
            });

            // Collect unique id_donante values to fetch names
            const donanteIds = Array.from(new Set(donaciones.map(donacion => donacion.id_donante)));

            // Fetch the corresponding names from the "donantes" resource
            const { data: donantes } = await dataProvider.getMany('donantes', {
                ids: donanteIds,
            });

            // Create a mapping from id_donante to nombre
            const donanteMap = donantes.reduce((acc, donante) => {
                acc[donante.id] = donante.nombre; // Assuming "id" is the unique key in "donantes"
                return acc;
            }, {});

            // Create a new PDF document
            const doc = new jsPDF();
            doc.text('Donaciones Report', 10, 10);

            // Define the table columns
            const tableColumns = ['ID', 'Donante', 'Campaña', 'Fecha', 'Cantidad', 'Tipo', 'Estado', 'Pais'];
            const tableRows: string[][] = [];

            // Populate the table rows with the fetched data
            donaciones.forEach((donacion: any) => {
                const row = [
                    donacion.id.toString(),
                    donanteMap[donacion.id_donante] || 'N/A',  // Get the name from the mapping
                    donacion.campana,
                    new Date(donacion.fecha).toLocaleDateString(),
                    donacion.cantidad.toString(),
                    donacion.tipo,
                    donacion.estado,
                    donacion.pais,
                ];
                tableRows.push(row);
            });

            // Generate the table in the PDF
            doc.autoTable({
                head: [tableColumns],
                body: tableRows,
            });

            // Save the generated PDF
            doc.save('donaciones_report.pdf');
            notify('PDF generated successfully!', { type: 'info' });
        } catch (error) {
            console.error('Error generating PDF:', error);
            notify('Error generating PDF: ' + error.message, { type: 'warning' });
        }
    };

    // Export the Button component
    return (
        <Button label="Generate PDF" onClick={handleGeneratePdf} />
    );
};

// Export the component for use in other files
export default GeneratePdfButton;
