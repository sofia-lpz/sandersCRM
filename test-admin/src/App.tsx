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

import { DonacionCreate, DonacionEdit, DonacionList } from "./donaciones";
import { UsuarioCreate, UsuarioList } from "./usuarios";
import { DonanteCreate } from "./donantes";

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
            edit={EditGuesser}
            create={UsuarioCreate}
            show={ShowGuesser}
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
          show={ShowGuesser}
        />
        <Resource
          name="donantes"
          list={ListGuesser}
          edit={EditGuesser}
          show={ShowGuesser}
          create={DonanteCreate}
        />
      </>
    )}
  </Admin>
);
