import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout.jsx';
import DetailView from './routes/DetailView.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="detail/:city_name" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
