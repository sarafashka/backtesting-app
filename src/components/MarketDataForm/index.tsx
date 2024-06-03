
import {useForm, SubmitHandler } from'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import BasicDatePicker from "../BasicDatePicker";
import { downloadMarketData, getExchanges, getMarketData, getSymbols, getTypes } from "../../store/marketDataSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { MarketDataFormValues } from '../../types/types';
import {  useEffect } from 'react';
import { getDateFromJs } from '../../utils/utils';
import AutocompleteSelect from '../AutocompleteSelect';
import { INITIAL_PAGE, INITIAL_PER_PAGE } from '../../constants/constants';


const formSchema: yup.ObjectSchema <MarketDataFormValues> = yup.object({
  exchange: yup.string().required('Exchange is required'),
  symbol: yup.string().required('Symbol is required'),
  type: yup.string().required('Type is required'),
  startDate: yup.date().default(() => new Date()).required('Date is required'),
  endDate: yup.date().default(() => new Date()).required('Date is required'),
})

const MarketDataForm = () => {

  const dispatch = useAppDispatch();
  const marketDataFilters = useAppSelector(state => state.marketData);
  const { exchanges, symbols, mdt } = marketDataFilters;

  const {
    handleSubmit,
    reset,
    control,
    getValues,
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

  useEffect(() => {
    const getOptions = async() => {
      await dispatch(getExchanges()); 
      await dispatch(getTypes());
    }
    getOptions();
  }, []);

  const onSubmit: SubmitHandler<MarketDataFormValues> = (data: MarketDataFormValues)=> {
      const formattedMarketData =  {
        exchange: data.exchange,
        symbol: data.symbol,
        market_data_type: data.type,
        date_start: getDateFromJs(data.startDate),
        date_end: getDateFromJs(data.endDate),
    };
    dispatch(downloadMarketData(formattedMarketData));
    dispatch(getMarketData({ page: INITIAL_PAGE, perPage: INITIAL_PER_PAGE }));//change after downloadMarketData will be response new market data
    reset();
  }

 const getOptions = async (name: string) => {
  if (name === 'exchange') {
    await dispatch(getSymbols(getValues('exchange')));
  }
 }

  return(
    <>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__data">
        <div className="form__data_input">
          <AutocompleteSelect 
              control={control}
              name='exchange'
              label='Exchange'
              isDisabled={exchanges.isDisabled}
              options={exchanges.options}
              changeValue={getOptions}/>

          <AutocompleteSelect 
              control={control}
              name='symbol'
              label='Symbol'
              isDisabled={symbols.isDisabled}
              options={symbols.options}/>

          <AutocompleteSelect 
              control={control}
              name='type'
              label='Type'
              isDisabled={mdt.isDisabled}
              options={mdt.options}/>
        </div>
         <div className="form__data_datepicker">
          <BasicDatePicker control={control} name='startDate' label='Start date' size='normal'/>
          <BasicDatePicker control={control} name='endDate' label='End date' size='normal'/>
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
