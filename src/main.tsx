import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home/Home.tsx'
import Boards from './components/Boards/Boards.tsx'
import PageNotFound from './components/PageNotFound/PageNotFound.tsx'
import Board from './components/Board/Board.tsx'
import BoardNotFound from './components/BoardNotFound/BoardNotFound.tsx'
import Layout from './components/Layout/Layout.tsx'
import BoardProvider from './components/Shared/Context/BoardContext/BoardContext.tsx'

const router = createBrowserRouter ([
  {path:'/' ,
     element: <Layout/> , 
     errorElement: <PageNotFound/> ,
      children:[
  {path: '/' ,errorElement: <PageNotFound/> , element:<Home/>} ,
  {path: '/boards' , element:<Boards/>} ,
  {path: '/boards/:boardId', errorElement:<BoardNotFound/> ,  element: <Board/>}
      ]
    }
])
createRoot(document.getElementById('root')!).render(
  <BoardProvider>
    <RouterProvider router={router}/>
      {/* <App /> */}
  </BoardProvider>
)
