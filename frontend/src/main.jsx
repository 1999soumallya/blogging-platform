import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Loader from './shared/Loader.jsx'
import { Provider } from 'react-redux'
import AuthProvider from './context/auth.context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import store from './services/store.js'

createRoot(document.getElementById('root')).render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Toaster position='top-right' />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </Suspense>,
)
