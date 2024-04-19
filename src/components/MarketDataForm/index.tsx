
import {useForm, SubmitHandler } from'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import BasicDatePicker from "../BasicDatePicker";
import { addMarketData } from "../../store/marketDataSlice";
import { useAppDispatch } from "../../hooks/reduxTypedHooks";
import { MarketDataFormValues } from '../../types/types';
import AsynchronousSelect from '../Autocomplete';
import { marketDataService } from '../../api/marketDataService';
import {  useState } from 'react';


// const formSchema: yup.ObjectSchema <MarketDataFormValues> = yup.object({
//   exchange: yup.string().required('Exchange is required'),
//   symbol: yup.string().required('Symbol is required'),
//   type: yup.string().required('Type is required'),
//   startDate: yup.date().default(() => new Date()).required('Date is required'),
//   endDate: yup.date().default(() => new Date()).required('Date is required'),
// })
interface IFormInput {
  exchange: string;
  symbol: string;
  type: string;
  startDate: Date;
  endDate: Date;
}

type InputSelected = {
  value: string,
  isDisabled: boolean
}

const MarketDataForm = () => {

  const [exchangeSelected, setExchangeSelected] = useState<InputSelected>({value:'', isDisabled: true});
  const [symbolSelected, setSymbolSelected] = useState<InputSelected>({value:'', isDisabled: true});

  const dispatch = useAppDispatch();


  const {
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
  } = useForm<MarketDataFormValues>({
      defaultValues: {
      exchange: '',
      symbol: '',
      type: '',
      startDate: new Date(),
      endDate: new Date(),
    }
  // @ts-ignore
    // resolver: yupResolver(formSchema),

  });

  const onSubmit: SubmitHandler<MarketDataFormValues> = (data: MarketDataFormValues)=> {
    console.log('data', data)
    const randomId = String(Math.floor(Math.random() * 1000));
      const requestMarketData =  {
        id: randomId,
        exchange: data.exchange,
        symbol: data.symbol,
        market_data_type: data.type,
        date_start: JSON.stringify(data.startDate),
        date_end: JSON.stringify(data.endDate),
    };
    dispatch( addMarketData(requestMarketData));
    reset();
  }

  return(
    <>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__data">
        <div className="form__data_input">
          <AsynchronousSelect 
            control={control}
            name='exchange'
            label='Exchange'
            getOptions ={marketDataService.getExchanges}
            isDisabled={false}
            isSelected={() => setExchangeSelected({isDisabled: false, value: getValues('exchange')})}
          />
          <AsynchronousSelect 
            control={control}
            name='symbol'
            label='Symbol'
            getOptionsWithData ={marketDataService.getSymbols}
            isDisabled={exchangeSelected.isDisabled}
            dataForRequest={exchangeSelected.value}
            isSelected={() => setSymbolSelected({isDisabled: false, value: getValues('symbol')})}
          />
            <AsynchronousSelect 
            control={control}
            name='type'
            label='Type'
            getOptionsWithData ={marketDataService.getTypes}
            isDisabled={symbolSelected.isDisabled}
            dataForRequest={symbolSelected.value}
          />
        </div>
         <div className="form__data_datepicker">
          <BasicDatePicker control={control} name='startDate' label='Start date'/>
          <BasicDatePicker control={control} name='endDate' label='End date'/>
        </div>
      </div>
      <div className="form__submit">
        <Button variant="contained" sx={{ width:1 }} type='submit'>Download</Button>
      </div>
    </form>
  
    </>
  );
};

export default MarketDataForm;
