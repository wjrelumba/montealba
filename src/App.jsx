import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contextProviders/ThemeProvider'
import UserProvider from './contextProviders/UserProvider'
import MediaProvider from './contextProviders/MediaProvider'
import ToastComponent from './components/ToastComponent'
import Navbar from './components/Navbar'
import SidebarProvider from './contextProviders/SidebarProvider'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <>
      <ToastComponent>
        <UserProvider>
          <MediaProvider>
            <ThemeProvider>
              <SidebarProvider>
                <Sidebar/>
                <Navbar/>
                <Outlet/>
              </SidebarProvider>
            </ThemeProvider>
          </MediaProvider>
        </UserProvider>
      </ToastComponent>
    </>
  )
}

export default App
