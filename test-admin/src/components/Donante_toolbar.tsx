import { Toolbar, SaveButton, DeleteWithConfirmButton } from 'react-admin';
import { Box } from '@mui/material';

export const MyToolbar = () => (
    <Toolbar>
        <SaveButton label="Save" />
        <Box sx={{ flexGrow: 1 }} />
        <DeleteWithConfirmButton
                label="Eliminar"
                confirmTitle={`Eliminar donante`}
                confirmContent="¿Estas seguro que quieres eliminar a este donante? Esto eliminara sus donaciones."
            />
    </Toolbar>
);