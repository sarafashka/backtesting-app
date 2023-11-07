import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import Footer from "../Footer";
import Header from "../Header";

const Layout = () => {
  return(
    <>
    <div className="container">
      <Header/>
      <main className="main">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer/>  
    </div>
    
    </>
  )
}
export default Layout;