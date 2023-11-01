import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary";
import Header from "../Header";

const Layout = () => {
  return(
    <>
    <Header/>
    <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  )
}
export default Layout;