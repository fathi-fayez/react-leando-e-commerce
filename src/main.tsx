import { createRoot } from 'react-dom/client'
import RouteRoot from './routes/routes'
import './index.css'
import { store, persistor } from '@store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '@services/axios-global'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouteRoot />
    </PersistGate>
  </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
