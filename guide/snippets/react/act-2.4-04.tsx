// src/App.tsx — uso de los compound components Tabs
import { TabGroup, Tab, TabPanel } from './components/Tabs';

export default function App() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Compound Component: Tabs</h1>

      <TabGroup>
        <div role="tablist" style={{ borderBottom: '1px solid #e5e7eb' }}>
          <Tab label="Perfil" index={0} />
          <Tab label="Configuracion" index={1} />
          <Tab label="Notificaciones" index={2} />
        </div>

        <TabPanel index={0}>
          <h2>Mi Perfil</h2>
          <p>Aqui va el contenido del perfil del usuario.</p>
        </TabPanel>

        <TabPanel index={1}>
          <h2>Configuracion</h2>
          <p>Opciones de configuracion de la cuenta.</p>
        </TabPanel>

        <TabPanel index={2}>
          <h2>Notificaciones</h2>
          <p>Preferencias de notificaciones.</p>
        </TabPanel>
      </TabGroup>
    </main>
  );
}
