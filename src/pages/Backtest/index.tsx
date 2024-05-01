import backtestimg from '../../assets/img/Myapp_sample.jpeg';
import BacktestChart from '../../components/BacktestChart';
import BacktestForm from '../../components/BacktestForm';
import BacktestTable from '../../components/BacktestTable';
import './backtest.css';

const Backtest: React.FC = () => {
  return(
    <>
    <h2>Select the parameters and run the backtest</h2>
    <div className="backtest__wrapper">
      <section className="backtest__form">
        <div className='data__container'>
          <BacktestForm></BacktestForm> 
        </div>
      </section>

      <div className='backtest__result'>
        
        <section className="backtest__chart">
         <BacktestChart/>
        </section>

      <section className="backtest__metrics">
          <BacktestTable/>
        </section>

      </div>

    </div>
    </>
  )
}

export default Backtest;