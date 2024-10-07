import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  usePermissions
} from "react-admin";

import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import authProvider from './authProvider';

import { DonacionCreate, DonacionList } from "./donaciones";
import { UsuarioCreate, UsuarioList } from "./usuarios";
import { DonanteCreate, DonanteShow } from "./donantes";

import i18nProvider from './i18nProvider';
import Dashboard from './Dashboard';

export const App = () => (
  <Admin layout={Layout} 
  dataProvider={dataProvider} 
  authProvider={authProvider}
  i18nProvider={i18nProvider}
  >
    <Resource name="usuarios" list={UsuarioList} edit={EditGuesser} create={UsuarioCreate} show={ShowGuesser}/>
    <Resource name="dashboard" list={Dashboard} options={{ label: 'Dashboard' }} />
    <Resource name="donaciones" create={DonacionCreate} list={DonacionList} edit={EditGuesser} show={ShowGuesser}/>
    <Resource name="donantes" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={DonanteCreate}/>

  </Admin>
);
