import BacktestChart from '../../components/BacktestChart';
import BacktestForm from '../../components/BacktestForm';
import BacktestMetrics from '../../components/BacktestMetrics';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import './backtest.css';

const Backtest: React.FC = () => {

  const klines = useAppSelector((state) => state.backtest.klines);
  
  return(
    <>
    <h2>Select the parameters and run the backtest</h2>
    <div className="backtest__wrapper">
      <section className="backtest__form">
        {/* <div className='data__container'> */}
          <BacktestForm></BacktestForm> 
        {/* </div> */}
      </section>

      <div className='backtest__result'>
        
      { klines && 
        <section className="backtest__chart">
          <BacktestChart/>
        </section> 
      } 

      <section className="backtest__metrics">
          <BacktestMetrics/>
        </section>

      </div>

    </div>
    </>
  )
}

export default Backtest;