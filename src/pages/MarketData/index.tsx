
import { useEffect } from "react";
import MarketDataForm from "../../components/MarketDataForm/index";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { getMarketData } from "../../store/marketDataSlice";
import './marketdata.css';
import { INITIAL_PAGE, INITIAL_PER_PAGE } from "../../constants/constants";
import DataTable from "../../components/DataTable";
import { COLUMNS } from "../../content/marketData";
import Loader from "../../components/Modal/Loader";

const MarketData = () => {

  const dispatch = useAppDispatch();
  
  const rows = useAppSelector(state => state.marketData.list);
  const isLoading = useAppSelector(state => state.marketData.isLoading);


  useEffect(() => {
    dispatch(getMarketData({ page: INITIAL_PAGE, perPage: INITIAL_PER_PAGE }));
}, []);

  return(
    <>
   {isLoading && <Loader open={isLoading}/>}
    <h2 className="market-data__title">Get the market data and save it in your account</h2>
    <div className="market-data__wrapper">
      <div className="data__container">
        <MarketDataForm/>
    </div>
    <div className="data__container">
       <div className="data-grid">
          <DataTable rows={rows} columns={COLUMNS}/>
       </div> 
      </div>
    </div>
  
    </>
  )
}
export default MarketData;
