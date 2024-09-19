import { Datagrid, 
    EmailField, 
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

export const CommentList = () => (
    <List>
        <Datagrid>
            <ReferenceField source="postId" reference="posts" />
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);

export const CommentShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="postId" reference="posts" />
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="body" />
        </SimpleShowLayout>
    </Show>
);

export const CommentEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="postId" reference="posts" />
            <TextInput source="id" InputProps={{ disabled:true }}/>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="body" multiline rows={5}/>
        </SimpleForm>
    </Edit>
);

export const CommentCreate = () => (
    <Create>
      <SimpleForm>
        <ReferenceInput source="postId" reference="posts" />
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="body" multiline rows={5}/>
      </SimpleForm>
    </Create>
  );

