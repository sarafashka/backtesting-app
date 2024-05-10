import { Navigate, RouterProvider,  createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import AppRoutes from "../constants/routes";
import About from "../pages/About";
import Backtest from "../pages/Backtest";
import MarketData from "../pages/MarketData";
import Pricing from "../pages/Pricing";
import Auth from "../pages/Auth";
import MyBacktesting from "../pages/MyBacktesting";
import { Settings } from "@mui/icons-material";
import { authService } from "../api/authService";
import Profile from "../pages/Profile";
import Error404 from "../pages/Error404/Error404";

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
          path: AppRoutes.MARKET_DATA,
          element: < MarketData/>,
        },
        {
          path: AppRoutes.BACKTEST,
          element: < Backtest/>,
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
          path: AppRoutes.MY_BACKTESTING,
          element: <MyBacktesting/>,
        },
        {
          path: AppRoutes.PROFILE,
          element: <Profile/>,
        },
        ]
    }
  ]

  // function privateRoutes() {
  //   return {
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: AppRoutes.MARKET_DATA,
  //         element: < MarketData/>,
  //       },
  //       {
  //         path: AppRoutes.BACKTEST,
  //         element: < Backtest/>,
  //       },
  //       { path: "*", element: <Navigate to="/" replace /> },
  //     ],
  //   };
  // }

  // function publicRoutes() {
  //   return [
  //     {
  //       index: true,
  //       element: <About />,
  //     },
  //     {
  //       path: AppRoutes.PRICING,
  //       element: <Pricing/>,
  //     },
  //     {
  //       path: AppRoutes.AUTH,
  //       element: <Auth/>,
  //     },
  //     { path: "*", element: <Navigate to="/login" replace /> },
  //   ];
  // }

  // const router = createBrowserRouter([
  //   authService.isUserLogged() ? privateRoutes() : {},
  //   ...publicRoutes(),
  // ]);

  const router = createBrowserRouter(routes, { basename: import.meta.env.DEV ? '/' : '/backtesting-app/'})  //vite.config.ts

  return <RouterProvider router={router} />
}

export default App;