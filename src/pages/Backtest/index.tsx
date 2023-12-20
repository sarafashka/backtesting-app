import backtestimg from '../../assets/img/Myapp_sample.jpeg';
import BacktestForm from '../../components/BacktestForm';
import './backtest.css';

const Backtest = () => {
  return(
    <>
    <div className="backtest__wrapper">

      <section className="backtest__form">
        <BacktestForm></BacktestForm>
      </section>

      <section className="backtest__chart">
      <div className="info__graph">
        <img src={backtestimg} alt="Backtest graph image" />
      </div>
      </section>

      <section className="backtest__data">
        <div>Some metrics</div>
      </section>

    </div>
    </>
  )
}

export default Backtest;