import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contextProviders/ThemeProvider'
import Sidebar from './components/Sidebar'
import UserProvider from './contextProviders/UserProvider'
import MediaProvider from './contextProviders/MediaProvider'

function App() {
  return (
    <>
      <UserProvider>
        <MediaProvider>
          <ThemeProvider>
            <Sidebar/>
            <Outlet/>
          </ThemeProvider>
        </MediaProvider>
      </UserProvider>
    </>
  )
}

export default App
