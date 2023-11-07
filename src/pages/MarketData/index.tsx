import ComboBox from "../../components/MaterialUI/InputMUI"
import { symbols, types } from "../../testData/symbols";

const MarketData = () => {
  return(
    <>
    <h2>Market data</h2>
    <ComboBox label='Symbol' options={symbols}/>
    <ComboBox label='Type' options={types}/>
    </>
  )
}
export default MarketData;
