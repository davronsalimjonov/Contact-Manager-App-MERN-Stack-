import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./store"
import { QueryClientProvider } from "react-query"
import { queryClinet } from "./services/api"
import Routers from "./routers"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClinet}>
          <Routers />
          <Toaster />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
