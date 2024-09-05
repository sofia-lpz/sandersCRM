import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";

import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import authProvider from './authProvider';

import { UserList, UserShow, UserEdit, UserCreate } from "./users";
import { PostEdit, PostList, PostCreate, PostShow } from "./posts";
import { TodoList, TodoEdit, TodoShow, TodoCreate } from "./todos";
import { CommentList, CommentEdit, CommentShow, CommentCreate } from "./comments";
import { AlbumList, AlbumEdit, AlbumShow, AlbumCreate } from "./albums";
import { PhotoList, PhotoEdit, PhotoShow, PhotoCreate} from "./photos";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="donaciones" list={ListGuesser} />
  </Admin>
);
