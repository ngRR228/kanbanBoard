import { createRoot } from 'react-dom/client'
import BoardProvider from './components/Shared/Context/BoardContext/BoardContext.tsx'
import { ThemeProvider } from './components/Shared/Context/ThemeContext/ThemeContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
 <ThemeProvider>
  <BoardProvider>
    <App />
  </BoardProvider>
  </ThemeProvider> 
)
