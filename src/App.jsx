import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./store"
import { QueryClientProvider } from "react-query"
import { queryClinet } from "./services/api"

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClinet}>
          
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
