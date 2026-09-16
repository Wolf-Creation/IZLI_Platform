import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './apps/admin/AdminApp'
import WebsiteApp from './apps/website/WebsiteApp'
import './index.css'

const isAdminHost = window.location.hostname === 'admin.izli.tn' || window.location.hostname === 'www.admin.izli.tn'
const RootApp = import.meta.env.MODE === 'admin' || import.meta.env.MODE === 'admin-render' || isAdminHost ? AdminApp : WebsiteApp

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
)
