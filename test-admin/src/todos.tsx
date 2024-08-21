import { List, 
    Datagrid, 
    TextField, 
    ReferenceField, 
    EditButton, 
    SimpleForm, 
    ReferenceInput,
TextInput,
Edit,
Create,
BooleanField,
Show,
SimpleShowLayout,
BooleanInput
 } from "react-admin";

 export const TodoList = () => (
     <List>
         <Datagrid>
         <TextField source="id" />
             <ReferenceField source="userId" reference="users" link="show"/>
             <TextField source="title" />
             <BooleanField source="completed" />
         </Datagrid>
     </List>
 );

export const TodoShow = () => (
    <Show>
        <SimpleShowLayout>
        <TextField source="id" />
            <ReferenceField source="userId" reference="users" link="show"/>
            <TextField source="title" />
            <BooleanField source="completed" />
        </SimpleShowLayout>
    </Show>
);

export const TodoEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="id" InputProps={{ disabled:true }}/>
            <TextInput source="title" />
            <BooleanInput source="completed" />
        </SimpleForm>
    </Edit>
);

export const TodoCreate = () => (
    <Create>
      <SimpleForm>
        <ReferenceInput source="userId" reference="users" />
        <TextInput source="title" />
        <BooleanInput source="completed"/>
      </SimpleForm>
    </Create>
  );