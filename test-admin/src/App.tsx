import {
  Admin,
  Resource,
} from "react-admin";

import dataProvider from "./providers/dataProvider";
import authProvider from './providers/authProvider';

import { DonacionCreate, DonacionEdit, DonacionList, DonacionShow } from "./resources/donaciones";
import { UsuarioCreate, UsuarioList, UsuarioEdit, UsuarioShow } from "./resources/usuarios";
import { DonanteCreate, DonanteEdit, DonanteShow, DonanteList } from "./resources/donantes";

import i18nProvider from './i18nProvider';
import Dashboard from './resources/newDashboard';

export const App = () => (
  <Admin
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
            options={{ label: 'Usuarios', ariaLabel: 'Gestión de Usuarios' }}
          />
        )}
        <Resource
          name="dashboard"
          list={Dashboard}
          options={{ label: 'Dashboard', ariaLabel: 'Dashboard' }}
        />
        <Resource
          name="donaciones"
          create={DonacionCreate}
          list={DonacionList}
          edit={DonacionEdit}
          show={DonacionShow}
          options={{ label: 'Donaciones', ariaLabel: 'Gestión de Donaciones' }}
        />
        <Resource
          name="donantes"
          list={DonanteList}
          edit={DonanteEdit}
          show={DonanteShow}
          create={DonanteCreate}
          options={{ label: 'Donantes', ariaLabel: 'Gestión de Donantes' }}
        />
      </>
    )}
  </Admin>
);