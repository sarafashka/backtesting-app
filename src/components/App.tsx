import {Route, RouterProvider, createRoutesFromElements, createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import AppRoutes from "../constants/routes";
import About from "../pages/About";
import Backtest from "../pages/Backtest";
import MarketData from "../pages/MarketData";
import Pricing from "../pages/Pricing";

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} >
        <Route index element={<About/>} />
        <Route path={AppRoutes.MARKET_DATA} element={<MarketData/>} />
        <Route path={AppRoutes.BACKTEST} element={<Backtest/>} />
        <Route path={AppRoutes.PRICING} element={<Pricing/>} />
      </Route>
  )
);

const App = () => {
   return (
     <RouterProvider router={router} />
   )
}

export default App;
