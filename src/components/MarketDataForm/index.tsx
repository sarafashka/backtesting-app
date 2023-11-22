import { Button } from "@mui/material";
import { Dayjs } from "dayjs";
import { SyntheticEvent, useState } from "react";
import BasicDatePicker from "../../components/MaterialUI/DatePickerMUI";
import ComboBox from "../../components/MaterialUI/InputMUI"
import { exchanges, ISymbols, symbols, types } from "../../testData/symbols";
import { MarketDataItem } from "../../types/types";
import { addMarketData } from "../../store/marketDataSlice/marketDataSlice";
import { useAppDispatch } from "../../hooks/reduxTypedHooks";

const MarketDataForm = () => {
  const dispatch = useAppDispatch();

  const [ExchangeValue, setExchangeValue] = useState<ISymbols | null> (null);
  const [SymbolValue, setSymbolValue] = useState<ISymbols | null> (null);
  const [TypeValue, setTypeValue] = useState<ISymbols | null> (null);
  const [StartDatevalue, setStartDateValue] = useState<Dayjs | null>(null);
  const [EndDatevalue, setEndDateValue] = useState<Dayjs | null>(null);

  const handleExchangeChange = (event:SyntheticEvent, value:ISymbols | null) => {
    if (event) {
          setExchangeValue(value);
    }
  }
  const handleSymbolChange = (event:SyntheticEvent, value:ISymbols | null) => {
    if (event) {
    setSymbolValue(value);
    }
  }
  const handleTypeChange = (event:SyntheticEvent, value:ISymbols | null) => {
    if (event) {
    setTypeValue(value);
    }
  }
  const handleStartDateChange = (value: Dayjs | null) => {
    setStartDateValue(value);
  }

  const handleEndDateChange = (value: Dayjs | null) => {
    setEndDateValue(value);
  }

  const onSubmit = ()=> {
    const randomId = String(Math.floor(Math.random() * 1000));

    if(ExchangeValue && SymbolValue && TypeValue && StartDatevalue && EndDatevalue) {
      const requestMarketData: MarketDataItem =  {
        id: randomId,
        exchange: ExchangeValue.label,
        symbol: SymbolValue.label,
        type: TypeValue.label,
        startDate: JSON.stringify(StartDatevalue),
        endDate: JSON.stringify(EndDatevalue)
    };
    dispatch( addMarketData(requestMarketData));
    }
  }

  return(
    <>
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
        <Button variant="contained" sx={{ width:1 }} onClick={onSubmit}>Download</Button>
      </div>
    </div>
  
    </>
  )
}

export default MarketDataForm;
