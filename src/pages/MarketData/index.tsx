import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Dayjs } from "dayjs";
import { SyntheticEvent, useState } from "react";
import DataGridDemo from "../../components/MaterialUI/DataGridMUI";
import BasicDatePicker from "../../components/MaterialUI/DatePickerMUI";
import ComboBox from "../../components/MaterialUI/InputMUI"
import { exchanges, ISymbols, symbols, types } from "../../testData/symbols";
import { FormRequestMarketData } from "../../types/types";
import './marketdata.css';

const MarketData = () => {
  const [ExchangeValue, setExchangeValue] = useState<ISymbols | null> (null);
  const [SymbolValue, setSymbolValue] = useState<ISymbols | null> (null);
  const [TypeValue, setTypeValue] = useState<ISymbols | null> (null);
  const [StartDatevalue, setStartDateValue] = useState<Dayjs | null>(null);
  const [EndDatevalue, setEndDateValue] = useState<Dayjs | null>(null);
  
  const [MarketData, setMarketData] = useState<FormRequestMarketData[]>(()=> []);

  const handleExchangeChange = (event:SyntheticEvent, value:ISymbols | null) => {
    setExchangeValue(value);
  }
  const handleSymbolChange = (event:SyntheticEvent, value:ISymbols | null) => {
    setSymbolValue(value);
  }
  const handleTypeChange = (event:SyntheticEvent, value:ISymbols | null) => {
    setTypeValue(value);
  }
  const handleStartDateChange = (value: Dayjs | null) => {
    setStartDateValue(value);
  }

  const handleEndDateChange = (value: Dayjs | null) => {
    setEndDateValue(value);
  }

  const onSubmit = ()=> {
    if(ExchangeValue && SymbolValue && TypeValue && StartDatevalue && EndDatevalue) {
      const requestMarketData: FormRequestMarketData =  {
        exchange: ExchangeValue.label,
        symbol: SymbolValue.label,
        type: TypeValue.label,
        startDate: StartDatevalue,
        endDate: EndDatevalue
    };
    const newMarketData = [...MarketData, requestMarketData]
      setMarketData(newMarketData);
      localStorage.setItem('tableData', JSON.stringify(MarketData));
     // const fromLocalStorage = JSON.parse(localStorage.getItem('tableData'));
     // console.log(fromLocalStorage);
    }
  }

  return(
    <>
    <h2>Get the market data and save it in your account</h2>
    <div className="form">
      <div className="form__data">
        <div className="form__data_input">
          <ComboBox label='Exchange' options={exchanges} onChange={handleExchangeChange}/>
          <ComboBox label='Symbol' isDisabled={!ExchangeValue} options={symbols} onChange={handleSymbolChange}/>
          <ComboBox label='Type' isDisabled={!SymbolValue} options={types} onChange={handleTypeChange}/> 
        </div>
        <div className="form__data_datepicker">
          <BasicDatePicker label='Start date' onChange={handleStartDateChange}/>
          <BasicDatePicker label='End date' onChange={handleEndDateChange}/>
        </div>
      </div>
      <div className="form__submit">
        <Button variant="contained" onClick={onSubmit}>Download</Button>
      </div>
    </div>
    <div className="data-grid">
      <DataGridDemo></DataGridDemo>
    </div>
    </>
  )
}
export default MarketData;
