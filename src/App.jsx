import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contextProviders/ThemeProvider'
import Sidebar from './components/Sidebar'
import UserProvider from './contextProviders/UserProvider'
import MediaProvider from './contextProviders/MediaProvider'
import ToastComponent from './components/ToastComponent'

function App() {
  return (
    <>
      <ToastComponent>
        <UserProvider>
          <MediaProvider>
            <ThemeProvider>
              <Sidebar/>
              <Outlet/>
            </ThemeProvider>
          </MediaProvider>
        </UserProvider>
      </ToastComponent>
    </>
  )
}

export default App
