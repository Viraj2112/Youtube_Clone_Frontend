import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from './utils/sidebarContext.jsx'
import { SignInProvider } from './utils/userSignedIn.jsx' 
import { SearchTextProvider } from './utils/searchText.jsx'
import OptionBar from './Components/OptionBar.jsx';

function App() {

  return (
    <>
      <SidebarProvider>
        <SignInProvider>
          <SearchTextProvider>
            <div className='flex flex-col font-primary'>
              <Header />
              <div className='flex'>
                <OptionBar />
                {/* This Outlet renders the nested route element */}
                <Outlet />
              </div>
              <Footer />
            </div>
          </SearchTextProvider>
        </SignInProvider>
      </SidebarProvider>
    </>
  )
}

export default App
