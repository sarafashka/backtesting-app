import Plot from "react-plotly.js";
import { getDataForChart } from "../../functions/getDataForChart";

const BacktestChart: React.FC = () => {

  const dataForChart =  getDataForChart();

    return (
      <Plot
      // @ts-ignore
        data={dataForChart}
        layout={ { height: 600} }

      />
    );
}
export default BacktestChart;