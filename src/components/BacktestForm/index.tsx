import './backtestForm.css';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import BasicDatePicker from "../BasicDatePicker";
import InputForm from "../Input";
import { BacktestFormValues, FormMarketData } from "../../types/types";
import {  getDatesBT, getDefaultValues, getExchangesBT,  getSymbolsBT, getTypesBT } from "../../store/backtestFormSlice";
import AutocompleteSelect from "../AutocompleteSelect";
import { getDateFromJs } from "../../utils/utils";
import { getBacktestData, getKlines, getMetrics } from '../../store/backtestSlice';
import RadioButtonSelect from '../RadioButtonSelect';
import { backtestService } from '../../api/backtestService';

const BacktestForm:React.FC = () => {

  const dispatch = useAppDispatch();
  const backtestForm = useAppSelector(state => state.backtestForm);
  const { options, values } = backtestForm;

  const formSchema: yup.ObjectSchema <BacktestFormValues> = yup.object().shape({
    backtestExchange: yup.string().required('Exchange is required').default(''),
    backtestSymbol: yup.string().required('Symbol is required').default(''),
    backtestPeriod: yup.string().required('Backtest period is required').default(''),
    // chartPeriod: yup.string().required('Chart period is required').default(''),
    startDate: yup.string().default(''),
    endDate: yup.string().default(''),
    deposit: yup.number().moreThan(-1, 'Must to be positive').required('Field is required').default(0),
    commission: yup.number().moreThan(-1, 'Must to be positive').required('Field is required').default(0),
    priceLow: yup.number().moreThan(-1, 'Must to be positive').required('Field is required').default(0),
    priceHigh: yup.number().moreThan(-1, 'Must to be positive').required('Field is required').default(0),
    gridsCount: yup.number().moreThan(-1, 'Must to be positive').required('Field is required').default(0),
    gridTrigger: yup.number().moreThan(-1, 'Must to be positive').required('Field is required').default(0),
    gridStopLoss: yup.number().moreThan(-1, 'Must to be positive').default(undefined),
    gridTakeProfit: yup.number().moreThan(-1, 'Must to be positive').default(undefined),
    // sellAll: yup.boolean().default(false),
  })


   const formValues: BacktestFormValues = values;
    const {
      handleSubmit,
      control,
      getValues
    } = useForm<BacktestFormValues>({
    // @ts-ignore
      defaultValues: formSchema.cast(),
      values: formValues,
    // @ts-ignore
      resolver: yupResolver(formSchema,{ stripUnknown: true, abortEarly: false }),
  
    });

    useEffect(()=> {
      const getOptions = async() => {
        await dispatch(getDefaultValues()); 
        await dispatch(getExchangesBT());
        await dispatch(getSymbolsBT());
        await dispatch(getTypesBT(getValues('backtestSymbol')));
        buildChart();
      }
      getOptions();
      
   }, [])
  
    const onSubmit: SubmitHandler<BacktestFormValues> = async (data: BacktestFormValues)=> {
     console.log('form data', data);
      const formattedBacktestFormValues = {
        exchange: data.backtestExchange,
        symbol: data.backtestSymbol,
        market_data_type: data.backtestPeriod,
        chart_market_data_type: data.backtestPeriod,
        date_start: data.startDate,
        date_end: data.endDate,
        deposit: String(data.deposit),
        commission: String(data.commission),
        price_low: String(data.priceLow),
        price_high: String(data.priceHigh),
        grids_count: String(data.gridsCount),
        grid_trigger: String(data.gridTrigger),
        grid_sl: data.gridStopLoss?  String(data.gridStopLoss) : '',
        grid_tp: data.gridTakeProfit ? String(data.gridTakeProfit) : '',
        sell_all: false,
        // sell_all: Boolean(data.sellAll),
      }

      let id;
      try {
        const response = await backtestService.backtestRun(formattedBacktestFormValues);
        id = response.data.id;
      } catch (error) {
          throw new Error ('Some backtest problems')
      }
      await dispatch(getMetrics(id));
      await dispatch(getBacktestData(id));
      buildChart();
    }

    const changeValue = async (name: string) => {
      console.log('name', name)
      if (name != 'backtestExchange') {
        if (name === 'startDate' || name === 'endDate') {
          buildChart();
          } else {
          if (name === 'backtestSymbol') {
            await dispatch(getTypesBT(getValues('backtestSymbol')));
          }
          const data = {
              exchange: getValues('backtestExchange'),
              symbol: getValues('backtestSymbol'),
              mdt: getValues('backtestPeriod')
          };
          await  dispatch(getDatesBT(data));
          }
           buildChart();  
        }                           
    }

  const buildChart = () => {
    const requestKlines: FormMarketData = {
      exchange: getValues('backtestExchange'),
      symbol: getValues('backtestSymbol'),
      market_data_type: getValues('backtestPeriod'),
      date_start: getDateFromJs(new Date(getValues('startDate'))),
      date_end: getDateFromJs(new Date(getValues('endDate'))),
    };
    dispatch(getKlines(requestKlines));
    } 

      

  return(
    <>
     <form className="backtest-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="backtest-form__data">
      <div className="backtest-form_datepicker">
            <BasicDatePicker
              control={control}
              name='startDate'
              label='Start date'
              minDate={values.startDate}
              maxDate={values.endDate}
            />
            <BasicDatePicker
              control={control}
              name='endDate'
              label='End date'
              minDate={values.startDate}
              maxDate={values.endDate}
            />
      <div className="backtest-form_input">
          <InputForm control={control} name='deposit' label='Deposit'/>
          <InputForm control={control} name='commission' label='Commission'/>
          <InputForm control={control} name='priceLow' label='Price Low'/>
          <InputForm control={control} name='priceHigh' label='Price High'/>
          <InputForm control={control} name='gridsCount' label='Grids Count'/>
          <InputForm control={control} name='gridTrigger' label='Grid Trigger'/>
          <InputForm control={control} name='gridStopLoss' label='Grid Stop Loss'/>
          <InputForm control={control} name='gridTakeProfit' label='Grid Take Profit'/>
        </div> 
        <div className="backtest-form__submit">
        <Button  sx={{ width:1 }} type='submit'>Run grid backtest</Button>
      </div>
        </div>

          <div className="backtest-form_select">
            <AutocompleteSelect
              control={control}
              name='backtestExchange'
              options={options.exchange}
              changeValue = {changeValue}
              />

            <AutocompleteSelect
              control={control}
              name='backtestSymbol'
              options={options.symbol}
              changeValue = {changeValue }
            />
              {/* <AutocompleteSelect
              control={control}
              name='chartPeriod'
              label='ChartPeriod'
              options={options.type}
              /> */}
            <RadioButtonSelect
              control={control}
              options={options.type}
              name={'backtestPeriod'}
              checkedValue={values.backtestPeriod}
              changeValue = {changeValue }
            />
            </div>
          </div>
        <div className="backtest-form__checkbox"> 
          {/* <CheckboxForm control={control} label='Sel All' name='sellAll' /> */}
         </div>
    </form>
    </>
  )
}

export default BacktestForm;


