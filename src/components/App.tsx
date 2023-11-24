import { RouterProvider,  createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import AppRoutes from "../constants/routes";
import About from "../pages/About";
import Backtest from "../pages/Backtest";
import MarketData from "../pages/MarketData";
import Pricing from "../pages/Pricing";

const App = () => {
  const routes = [
    { path: "/",
      element: < Layout/>,
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
        ]
    }
  ]

  const router = createBrowserRouter(routes, { basename: import.meta.env.DEV ? '/' : '/backtesting-app/'})  //vite.config.ts

  return <RouterProvider router={router} />
}

export default App;