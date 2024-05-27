import './backtestForm.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import BasicDatePicker from "../BasicDatePicker";
import InputForm from "../Input";
// import CheckboxForm from "../Checkbox";
import { BacktestFormValues, FormMarketData } from "../../types/types";
import { getBacktestData, getDatesBT, getExchangesBT, getKlines, getMetrics, getSymbolsBT, getTypesBT } from "../../store/backtestSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { useEffect } from "react";
import AutocompleteSelect from "../AutocompleteSelect";
import { getDateFromJs } from "../../utils/utils";
import { backtestService } from "../../api/backtestService";
import { ButtonComponent } from '../MaterialUI/ButtonMUI';

  const formSchema: yup.ObjectSchema <BacktestFormValues> = yup.object().shape({
    backtestExchange: yup.string().required('Exchange is required'),
    backtestSymbol: yup.string().required('Symbol is required'),
    backtestPeriod: yup.string().required('Backtest period is required'),
    chartPeriod: yup.string().required('Chart period is required'),
    startDate: yup.date().default(() => new Date()).required('Date is required'),
    endDate: yup.date().default(() => new Date()).required('Date is required'),
    deposit: yup.number().moreThan(-1, 'Must to be positive').required('Field is required'),
    commission: yup.number().moreThan(-1, 'Must to be positive').required('Field is required'),
    priceLow: yup.number().moreThan(-1, 'Must to be positive').required('Field is required'),
    priceHigh: yup.number().moreThan(-1, 'Must to be positive').required('Field is required'),
    gridsCount: yup.number().moreThan(-1, 'Must to be positive').required('Field is required'),
    gridTrigger: yup.number().moreThan(-1, 'Must to be positive').required('Field is required'),
    gridStopLoss: yup.number().moreThan(-1, 'Must to be positive'),
    gridTakeProfit: yup.number().moreThan(-1, 'Must to be positive'),
    // sellAll: yup.boolean(),
  })

const BacktestForm:React.FC = () => {

  const dispatch = useAppDispatch();
  const backtestFilters = useAppSelector(state => state.backtest);
  const { exchanges, symbols, mdt, dates } = backtestFilters;
  const backtestData = useAppSelector((state) => state.backtest.data);
  
    const {
      // register,
      handleSubmit,
      setValue,
      // reset,
      control,
      getValues
    } = useForm<BacktestFormValues>({
        defaultValues: {
        backtestExchange: exchanges.value,
        backtestSymbol: symbols.value,
        backtestPeriod: '',
        chartPeriod: '',
        startDate: new Date('01-01-2024'),
        endDate: new Date('02-01-2024'),
        deposit: undefined,
        commission: undefined,
        priceLow: undefined,
        priceHigh: undefined,
        gridsCount: undefined,
        gridTrigger: undefined,
        gridStopLoss: undefined,
        gridTakeProfit: undefined,
        // sellAll: false,
      },
    // @ts-ignore
      resolver: yupResolver(formSchema),
  
    });

    useEffect(() => {
      dispatch(getExchangesBT());
      dispatch(getSymbolsBT());
      dispatch(getTypesBT(getValues('backtestSymbol')));
      const data = {
        exchange: getValues('backtestExchange'),
        symbol: getValues('backtestSymbol'),
        mdt: getValues('backtestPeriod')
      }
      dispatch(getDatesBT(data));
      buildChart();

    }, [dispatch]);
  
    const onSubmit: SubmitHandler<BacktestFormValues> = async (data: BacktestFormValues)=> {
      // console.log('form data', data);
      const formattedBacktestFormValues = {
        exchange: data.backtestExchange,
        symbol: data.backtestSymbol,
        market_data_type: data.backtestPeriod,
        chart_market_data_type: data.chartPeriod,
        date_start: getDateFromJs(data.startDate),
        date_end: getDateFromJs(data.endDate),
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
      console.log('name', name);
      const data = {
        exchange: getValues('backtestExchange'),
        symbol: getValues('backtestSymbol'),
        mdt: getValues('backtestPeriod')
      };
      if (name != 'backtestExchange') {
        if (name === 'startDate' || name === 'endDate') {
          buildChart();
        } else {
          if (name === 'backtestSymbol') {
            await dispatch(getTypesBT(getValues('backtestSymbol')));
            setValue('backtestPeriod', mdt.value );
            await  dispatch(getDatesBT(data));
    
          } if (name === 'backtestPeriod') {
            await  dispatch(getDatesBT(data));
          }
          setValue('startDate', new Date(dates.startDate));
          setValue('endDate', new Date(dates.endDate));
          buildChart();  
        }                           
    
      console.log('values', getValues())


    }
     

    }

    // const getSymbolsOptions = () => {
    //   buildChart();
    // }

    // const getTypesOptions = () => {
    //   dispatch(getTypesBT(getValues('backtestSymbol')));
    //   buildChart();
    // }

    // const getDatesOptions = () => {
    //   const data = {
    //     exchange: getValues('backtestExchange'),
    //     symbol: getValues('backtestSymbol'),
    //     mdt: getValues('backtestPeriod')
    //   }
    //   dispatch(getDatesBT(data));
    //   buildChart();
    // }

    const handleClick = async () => {
      console.log('values', getValues());
      console.log('mdt state value', mdt.value);
      setValue('backtestPeriod', mdt.value );
      //   const id = 2;
      //  await dispatch(getMetrics(id));
      //  await dispatch(getBacktestData(id));
      //  buildChart();
      };

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
      <ButtonComponent onClick={handleClick}>Test</ButtonComponent>
      <div className="backtest-form__data">
      <div className="backtest-form_datepicker">
            <BasicDatePicker
              control={control}
              name='startDate'
              label='Start date'
              minDate={dates.startDate}
              maxDate={dates.endDate}
              isDisabled={dates.isDisabled}
            />
            <BasicDatePicker
              control={control}
              name='endDate'
              label='End date'
              minDate={dates.startDate}
              maxDate={dates.endDate}
              isDisabled={dates.isDisabled}
            />
      <div className="backtest-form_input">
        {/* <input {...register("deposit")} /> */}
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
              // label='Exchange'
              options={exchanges.options}
              isDisabled={exchanges.isDisabled}
              onChange = {changeValue }
              // onClose={getSymbolsOptions}
              />

            <AutocompleteSelect
              control={control}
              name='backtestSymbol'
              // label='Symbol'
              options={symbols.options}
              isDisabled={symbols.isDisabled}
              onChange = {changeValue }
              // onClose={getTypesOptions}
              />
             <AutocompleteSelect
              control={control}
              name='backtestPeriod'
              label='Backtest Period'
              options={mdt.options}
              isDisabled={mdt.isDisabled}
              onChange = {changeValue }
              // onClose={getDatesOptions}
              />
              <AutocompleteSelect
              control={control}
              name='chartPeriod'
              label='ChartPeriod'
              options={mdt.options}
              isDisabled={mdt.isDisabled}
              />
          </div>
          </div>
        {/* </div> */}
        <div className="backtest-form__checkbox"> 
          {/* <CheckboxForm control={control} label='Sel All' name='sellAll' /> */}
         </div>
    </form>
    </>
  )
}

export default BacktestForm;


