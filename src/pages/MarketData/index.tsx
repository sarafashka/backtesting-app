
import { useEffect } from "react";
import MarketDataForm from "../../components/MarketDataForm/index";
import MarketDataGrid from "../../components/MarketDataGrid";
import { useAppDispatch } from "../../hooks/reduxTypedHooks";
import { getMarketData } from "../../store/marketDataSlice";
import './marketdata.css';
import { INITIAL_PAGE, INITIAL_PER_PAGE } from "../../constants/constants";

const MarketData = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMarketData({ page: INITIAL_PAGE, perPage: INITIAL_PER_PAGE }));
}, []);

  return(
    <>
    <h2 className="market-data__title">Get the market data and save it in your account</h2>
    <div className="market-data__wrapper">
      <div className="data__container">
        <MarketDataForm/>
    </div>
    <div className="data__container">
       <div className="data-grid">
          <MarketDataGrid/>
       </div> 
      </div>
    </div>
  
    </>
  )
}
export default MarketData;
