import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import Footer from "../Footer";
import Header from "../Header";

const Layout = () => {
  return(
    <>
     <ErrorBoundary>
       <div className="container">
          <Header/>
           <main className="main">
              <Outlet />
           </main>
          <Footer/>  
        </div>
     </ErrorBoundary>
    </>
  )
}
export default Layout;