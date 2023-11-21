
import MarketDataForm from "../../components/MarketDataForm";
import DataGridDemo from "../../components/MaterialUI/DataGridMUI";
import './marketdata.css';

const MarketData = () => {

  return(
    <>
    <h2 className="market-data__title">Get the market data and save it in your account</h2>
    <div className="market-data__wrapper">
      <div className="data__container">
        <MarketDataForm/>
    </div>
    <div className="data__container">
       <div className="data-grid">
          <DataGridDemo/>
       </div> 
    </div>
    </div>
  
  
    </>
  )
}
export default MarketData;
