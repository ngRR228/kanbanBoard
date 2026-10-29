import { createBrowserRouter, RouterProvider } from 'react-router'
import styles from "./App.module.css"
import { useContext } from 'react'
import { ThemeContext } from './components/Shared/Context/ThemeContext/ThemeContext'
import Layout from './components/Layout/Layout'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Home from './components/Home/Home'
import Boards from './components/Boards/Boards'
import BoardNotFound from './components/BoardNotFound/BoardNotFound'
import Board from './components/Board/Board'

const router = createBrowserRouter([
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

function App() {
const { currentTheme } = useContext(ThemeContext)

  return (
    <>
  <div className={currentTheme === 'light' ? styles.light : styles.dark}>
   <RouterProvider router={router}/>
   </div>
    </>
  )
}

export default App
