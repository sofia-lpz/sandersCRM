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

import { DonacionCreate, DonacionEdit, DonacionList, DonacionShow } from "./donaciones";
import { UsuarioCreate, UsuarioList, UsuarioEdit, UsuarioShow } from "./usuarios";
import { DonanteCreate, DonanteEdit, DonanteShow, DonanteList } from "./donantes";

import i18nProvider from './i18nProvider';
import Dashboard from './Dashboard';

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    {permissions => (
      <>
        {permissions === 'admin' && (
          <Resource
            name="usuarios"
            list={UsuarioList}
            edit={UsuarioEdit}
            create={UsuarioCreate}
            show={UsuarioShow}
          />
        )}
        <Resource
          name="dashboard"
          list={Dashboard}
          options={{ label: 'Dashboard' }}
        />
        <Resource
          name="donaciones"
          create={DonacionCreate}
          list={DonacionList}
          edit={DonacionEdit}
          show={DonacionShow}
        />
        <Resource
          name="donantes"
          list={DonanteList}
          edit={DonanteEdit}
          show={DonanteShow}
          create={DonanteCreate}
        />
      </>
    )}
  </Admin>
);
