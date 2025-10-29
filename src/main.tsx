import { createRoot } from 'react-dom/client'
import RouteRoot from './routes/routes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <RouteRoot />
)
