import { Datagrid,
     List, 
     ReferenceField, 
     TextField,
    Show,
SimpleShowLayout,
Edit,
ReferenceInput,
SimpleForm,
TextInput,
Create
 } from 'react-admin';

export const AlbumList = () => (
    <List>
        <Datagrid>
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="title" />
        </Datagrid>
    </List>
);

export const AlbumShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="title" />
        </SimpleShowLayout>
    </Show>
);

export const AlbumEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="id" InputProps={{ disabled:true }}/>
            <TextInput source="title" />
        </SimpleForm>
    </Edit>
);

export const AlbumCreate = () => (
    <Create>
      <SimpleForm>
        <ReferenceInput source="userId" reference="users" />
        <TextInput source="title" />
      </SimpleForm>
    </Create>
  );