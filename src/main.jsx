import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/*
  Main Entry Point
  ----------------
  This is where React mounts our app to the DOM.
  
  StrictMode: Helps identify potential problems in the app
  createRoot: React 18's new rendering API for concurrent features
*/
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
