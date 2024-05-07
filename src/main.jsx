import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import DetailPoke from './component/DetailPoke/DetailPoke.jsx'
import Faviorite from './component/Faviorite/Faviorite.jsx'
import About from './component/About/About.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'pokemon/:id',
    element: <DetailPoke />
  },
  {
    path: '/faviorite',
    element: <Faviorite />
  },
  {
    path: '/about',
    element: <About />
  }
])

// const favPoke = new Map();
// const favPokeString = JSON.stringify(Array.from(favPoke))
// sessionStorage.setItem('favPoke', favPokeString);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
