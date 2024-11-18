import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/api.js'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
