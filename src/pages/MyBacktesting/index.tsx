import './myBacktesting.css'
import { GridRowParams } from "@mui/x-data-grid";
import DataTable from "../../components/DataTable";
import { COLUMNS } from "../../content/marketData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { getBacktestData, getKlines, getMetrics } from "../../store/backtestSlice";
import { FormMarketData } from "../../types/types";
import BacktestMetrics from "../../components/BacktestMetrics";
import BacktestChart from "../../components/BacktestChart";


const MyBacktesting: React.FC = () => {

  const dispatch = useAppDispatch();
  const backtest = useAppSelector(state => state.backtest);

  const rows = [{
    id: 1,
    exchange: "binance",
    symbol: "btcusdt",
    market_data_type: "1h",
    date_start: "2024-01-01",
    date_end: "2024-05-01"
},
{
    id: 2,
    exchange: "binance",
    symbol: "ethusdt",
    market_data_type: "30m",
    date_start: "2024-05-06",
    date_end: "2024-05-06"
}
]

const buildChart = async (event:GridRowParams<any>) => {
  const { id, exchange, symbol, market_data_type, date_end, date_start  } = event.row;
  const data: FormMarketData = {
    exchange: exchange,
    symbol: symbol,
    market_data_type: market_data_type,
    date_end: date_end,
    date_start: date_start
  }

  await dispatch(getMetrics(id));
  await dispatch(getBacktestData(id));
  await dispatch(getKlines(data))

}


  return (
    <>
    <h2>Backtesting history</h2>
    <div className="backtesting">
      <section className="backtesting__container">
          <DataTable
            rows={rows}
            columns={COLUMNS}
            onClick={buildChart}
          />
      </section>
      <div className='backtesting__history'>
         <section className="backtesting__container">
          {backtest.metrics && <BacktestMetrics/>}
      </section>

      <section className="backtesting__container">
          {backtest.data && backtest.klines && <BacktestChart/>} 
      </section>
      </div>
      
     

    </div>
  
    </>
  )
}

export default MyBacktesting;