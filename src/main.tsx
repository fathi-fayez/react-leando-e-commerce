import { createRoot } from 'react-dom/client'
import RouteRoot from './routes/routes'
import './index.css'
import { store, persistor } from '@store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouteRoot />
    </PersistGate>
  </Provider>
)
