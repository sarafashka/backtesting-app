
import {useForm, SubmitHandler } from'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import BasicDatePicker from "../BasicDatePicker";
import { exchanges,  symbols, types } from "../../testData/symbols";
import { addMarketData } from "../../store/marketDataSlice";
import { useAppDispatch } from "../../hooks/reduxTypedHooks";
import SelectForm from '../Select';
import { MarketDataFormValues } from '../../types/types';

const formSchema: yup.ObjectSchema <MarketDataFormValues> = yup.object({
  exchange: yup.string().required('Exchange is required'),
  symbol: yup.string().required('Symbol is required'),
  type: yup.string().required('Type is required'),
  startDate: yup.date().default(() => new Date()).required('Date is required'),
  endDate: yup.date().default(() => new Date()).required('Date is required'),
})

const MarketDataForm = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    reset,
    control
  } = useForm<MarketDataFormValues>({
      defaultValues: {
      exchange: '',
      symbol: '',
      type: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  // @ts-ignore
    resolver: yupResolver(formSchema),

  });

  const onSubmit: SubmitHandler<MarketDataFormValues> = (data: MarketDataFormValues)=> {
    console.log('data', data)
    const randomId = String(Math.floor(Math.random() * 1000));
      const requestMarketData =  {
        id: randomId,
        exchange: data.exchange,
        symbol: data.symbol,
        type: data.type,
        startDate: JSON.stringify(data.startDate),
        endDate: JSON.stringify(data.endDate),
    };
    dispatch( addMarketData(requestMarketData));
    reset();
  }
  

  return(
    <>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__data">
        <div className="form__data_input">
          <SelectForm control={control} name='exchange' label='Exchange' options={exchanges}/>
          <SelectForm control={control} name='symbol' label='Symbol' options={symbols}/>
          <SelectForm control={control} name='type' label='Type' options={types}/>
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
