import { useEffect } from "react"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import { PersistGate } from "redux-persist/integration/react"
import { ArcElement, CategoryScale, Chart, LinearScale, LineElement, PointElement, Tooltip } from "chart.js"
import Routers from "./routers"
import { persistor, store } from "./store"
import useGetUser from "./hooks/useGetUser"
import { connectSocket } from "./services/socket"
import NotificationProvider from "./providers/NotificationProvider"

Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, PointElement, LineElement);

function App() {
  const { data: user } = useGetUser()

  useEffect(() => {
    if (user) {
      connectSocket({ userId: user?.id, role: user?.role })
    }
  }, [user])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NotificationProvider>
          <Routers />
          <Toaster />
        </NotificationProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
