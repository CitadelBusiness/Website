import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  AppRoutes  from './AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
<StrictMode>
    <AppRoutes />
  </StrictMode>
);



function importAll(r) {
  r.keys().forEach(r);
}
// Automatically import all CSS files in the `components/` folder
//mportAll(require.context('./components', true, /\.css$/));
// importAll(require.context('./pages', true, /\.css$/));
// importAll(require.context('./', true, /\.css$/));
