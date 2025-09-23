import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contextProviders/ThemeProvider'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <>
      <ThemeProvider>
        <Sidebar/>
        <Outlet/>
      </ThemeProvider>
    </>
  )
}

export default App
