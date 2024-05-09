import Plot from "react-plotly.js";
import { getDataForChart } from "./getDataForChart";

const BacktestChart: React.FC = () => {

  const dataForChart = getDataForChart();

    return (
      <Plot
        data={dataForChart}
        layout={ {width: 1000, height: 800} }
      />
    );
}
export default BacktestChart;