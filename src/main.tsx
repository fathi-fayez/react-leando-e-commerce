import { createRoot } from 'react-dom/client'
import RouteRoot from './routes/routes'
import './index.css'
import store from '@store/index'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouteRoot />
  </Provider>
)
