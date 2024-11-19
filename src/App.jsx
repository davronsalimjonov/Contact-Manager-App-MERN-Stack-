import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import { PersistGate } from "redux-persist/integration/react"
import { ArcElement, CategoryScale, Chart, LinearScale, LineElement, PointElement, Tooltip } from "chart.js"
import useGetStudents from "./hooks/useGetStudents"
import useGetGroups from "./hooks/useGetGroups"
import { persistor, store } from "./store"
import Routers from "./routers"

Chart.register(ArcElement, Tooltip, CategoryScale, LinearScale, PointElement, LineElement);

function App() {
  // useGetStudents()
  // useGetGroups()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <Routers />
          <Toaster />
      </PersistGate>
    </Provider>
  )
}

export default App
