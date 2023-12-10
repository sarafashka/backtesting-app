
import {useForm, SubmitHandler, FormProvider } from'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import BasicDatePicker from "../BasicDatePicker";
import { exchanges,  symbols, types } from "../../testData/symbols";
import { MarketDataItem} from "../../types/types";
import { addMarketData } from "../../store/marketDataSlice/marketDataSlice";
import { useAppDispatch } from "../../hooks/reduxTypedHooks";
import InputMarketDataForm from '../InputMarketDataForm';


interface FormSubmit {
  exchange: string;
  symbol: string;
  type: string;
  startDate: Date;
  endDate: Date;
}

const formSchema: yup.ObjectSchema <FormSubmit> = yup.object({
  exchange: yup.string().required('Exchange is required'),
  symbol: yup.string().required('Symbol is required'),
  type: yup.string().required('Type is required'),
  startDate: yup.date().default(() => new Date()).required('Date is required'),
  endDate: yup.date().default(() => new Date()).required('Date is required'),
})

const MarketDataForm = () => {
  const dispatch = useAppDispatch();

  const methods = useForm<FormSubmit>({
  // @ts-ignore
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSubmit> = (data: FormSubmit)=> {
    const randomId = String(Math.floor(Math.random() * 1000));
      const requestMarketData: MarketDataItem =  {
        id: randomId,
        exchange: data.exchange,
        symbol: data.symbol,
        type: data.type,
        startDate: JSON.stringify(data.startDate),
        endDate: JSON.stringify(data.endDate),
    };
    dispatch( addMarketData(requestMarketData));
  }
  

  return(
    <>
    <FormProvider {...methods}>
    <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="form__data">
        <div className="form__data_input">
          <InputMarketDataForm name='exchange' label='Exchange' options={exchanges}/>
          <InputMarketDataForm name='symbol' label='Symbol' options={symbols}/>
          <InputMarketDataForm name='type' label='Type' options={types}/>
        </div>
         <div className="form__data_datepicker">
          <BasicDatePicker label='Start date'/>
          <BasicDatePicker label='End date'/>
        </div>
      </div>
      <div className="form__submit">
        <Button variant="contained" sx={{ width:1 }} type='submit'>Download</Button>
      </div>
    </form>
    </FormProvider>
  
    </>
  );
};

export default MarketDataForm;
