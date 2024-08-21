import { Datagrid,
     List, 
     ReferenceField, 
     TextField, 
     UrlField,
    Show,
SimpleShowLayout,
Edit,
ReferenceInput,
SimpleForm,
TextInput,
ImageField,
Create
 } from 'react-admin';

export const PhotoList = () => (
    <List>
        <Datagrid>
            <ReferenceField source="albumId" reference="albums" link="show"/>
            <TextField source="id" />
            <TextField source="title" />
            <UrlField source="url" />
            <ImageField source="thumbnailUrl" label="Thumbnail Preview"/>
            <UrlField source="thumbnailUrl" />
        </Datagrid>
    </List>
);

export const PhotoShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="albumId" reference="albums" link="show"/>
            <TextField source="id" />
            <TextField source="title" />
            <UrlField source="url" />
            <ImageField source="thumbnailUrl" />
        </SimpleShowLayout>
    </Show>
);

export const PhotoEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="albums" link="show"/>
            <TextInput source="id" InputProps={{ disabled:true }}/>
            <TextInput source="title" />
            <TextInput source="url" />
            <TextInput source="thumbnailUrl" />
        </SimpleForm>
    </Edit>
);

export const PhotoCreate = () => (
    <Create>
      <SimpleForm>
        <ReferenceInput source="albumId" reference="albums" link="show"/>
        <TextInput source="title" />
        <TextInput source="url"/>
        <TextInput source="thumbnailUrl"/>
      </SimpleForm>
    </Create>
  );