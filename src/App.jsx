import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PersistGate } from "redux-persist/integration/react"
import { ArcElement, CategoryScale, Chart, LinearScale, LineElement, PointElement, Tooltip } from "chart.js"
import Routers from "./routers"
import { persistor, store } from "./store"
import { SocketProvider } from "./providers/SocketProvider"
import NotificationProvider from "./providers/NotificationProvider"
import SocketEventsProvider from "./providers/SocketEventsProvider"

Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, ChartDataLabels);

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SocketProvider>
          <NotificationProvider>
            <SocketEventsProvider />
            <div id="app">
              <Routers />
            </div>
            <Toaster containerStyle={{ zIndex: 100000 }} />
          </NotificationProvider>
        </SocketProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
