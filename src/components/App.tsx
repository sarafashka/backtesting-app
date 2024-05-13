import { RouterProvider,  createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import AppRoutes from "../constants/routes";
import About from "../pages/About";
import Backtest from "../pages/Backtest";
import MarketData from "../pages/MarketData";
import Pricing from "../pages/Pricing";
import Auth from "../pages/Auth";
import MyBacktesting from "../pages/MyBacktesting";
import Profile from "../pages/Profile";
import Error404 from "../pages/Error404/Error404";
import AuthRequired from "./AuthRequired";

const App = () => {
 
  const routes = [
    { path: "/",
      element: < Layout/>,
      errorElement: <Error404/>,
      children: [
        {
          index: true,
          element: <About />,
        },
        {
          path: AppRoutes.PRICING,
          element: <Pricing/>,
        },
        {
          path: AppRoutes.AUTH,
          element: <Auth/>,
        },
        {
          element: <AuthRequired/>,
          children: [
            {
              path: AppRoutes.MARKET_DATA,
              element: < MarketData/>,
            },
            {
              path: AppRoutes.BACKTEST,
              element: < Backtest/>,
            },
            {
            path: AppRoutes.PROFILE,
            element: <Profile/>,
            },
            {
              path: AppRoutes.MY_BACKTESTING,
              element: <MyBacktesting/>,
            },
            {
              path: AppRoutes.MY_BACKTESTING,
              element: <MyBacktesting/>,
            },
          ]
        },    
        ]
    }
  ]

  const router = createBrowserRouter(routes, { basename: import.meta.env.DEV ? '/' : '/backtesting-app/'})  //vite.config.ts

  return <RouterProvider router={router} />
}

export default App;