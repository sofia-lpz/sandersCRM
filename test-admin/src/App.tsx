import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";

import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";

import { UserList, UserShow, UserEdit, UserCreate } from "./users";
import { PostEdit, PostList, PostCreate, PostShow } from "./posts";
import { TodoList, TodoEdit, TodoShow, TodoCreate } from "./todos";
import { CommentList, CommentEdit, CommentShow, CommentCreate } from "./comments";
import { AlbumList, AlbumEdit, AlbumShow, AlbumCreate } from "./albums";
import { PhotoList, PhotoEdit, PhotoShow, PhotoCreate} from "./photos";

import loginPage from './loginPage.jsx';


import authProvider from './authProvider';

import Dashboard from './Dashboard';

export const App = () => (
  <Admin 
  loginPage= {loginPage} 
  layout={Layout} 
  dataProvider={dataProvider} 
  authProvider={authProvider}
  >
    <Resource name="users" list={UserList} edit={UserEdit} show={UserShow} create={UserCreate}/>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} show={PostShow}/>

    <Resource name="todos" list={TodoList} edit={TodoEdit} show={TodoShow} create={TodoCreate}/>

    <Resource name="dashboard" list={Dashboard} options={{ label: 'Dashboard' }} />


    <Resource name="comments" list={CommentList} edit={CommentEdit} show={CommentShow} create={CommentCreate}/>
    <Resource name="albums" list={AlbumList} edit={AlbumEdit} show={AlbumShow} create={AlbumCreate}/>

    <Resource name="photos" list={PhotoList} edit={PhotoEdit} show={PhotoShow} create={PhotoCreate}/>
  </Admin>
);
