import { Navigate, Outlet } from "react-router-dom"
import { authService } from "../../api/authService"

const AuthRequired: React.FC = () => {
  return (
      authService.isUserLogged() ? <Outlet/> : <Navigate to='/auth'/>
  )
}

export default AuthRequired;