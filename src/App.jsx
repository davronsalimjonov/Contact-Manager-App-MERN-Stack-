import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import { PersistGate } from "redux-persist/integration/react"
import { ArcElement, CategoryScale, Chart, LinearScale, LineElement, PointElement, Tooltip } from "chart.js"
import useGetStudents from "./hooks/useGetStudents"
import useGetGroups from "./hooks/useGetGroups"
import { persistor, store } from "./store"
import Routers from "./routers"
import { useEffect } from "react"
import useGetUser from "./hooks/useGetUser"
import { connectSocket } from "./services/socket"
import NotificationProvider from "./providers/NotificationProvider"

Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, PointElement, LineElement);

function App() {
  const { data: user } = useGetUser()
  useGetStudents()
  useGetGroups()

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
