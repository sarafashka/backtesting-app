import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import BasicDatePicker from "../BasicDatePicker";
import InputForm from "../Input";
import CheckboxForm from "../Checkbox";
import { BacktestFormValues } from "../../types/types";
import './backtestForm.css';
import { getExchangesBT, getMetrics, getSymbolsBT, getTypesBT } from "../../store/backtestSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxTypedHooks";
import { useEffect } from "react";
import AutocompleteSelect from "../AutocompleteSelect";
import { getDateFromJs } from "../utils/utils";
import { backtestService } from "../../api/backtestService";

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
    sellAll: yup.boolean(),
  })

const BacktestForm:React.FC = () => {

  const dispatch = useAppDispatch();
  const backtestFilters = useAppSelector(state => state.backtest);
  const { exchanges, symbols, mdt } = backtestFilters;

  
    const {
      handleSubmit,
      reset,
      control,
      getValues
    } = useForm<BacktestFormValues>({
        defaultValues: {
        backtestExchange: '',
        backtestSymbol: '',
        backtestPeriod: '',
        chartPeriod: '',
        startDate: new Date(),
        endDate: new Date(),
        deposit: undefined,
        commission: undefined,
        priceLow: undefined,
        priceHigh: undefined,
        gridsCount: undefined,
        gridTrigger: undefined,
        gridStopLoss: undefined,
        gridTakeProfit: undefined,
        sellAll: false,
      },
    // @ts-ignore
      resolver: yupResolver(formSchema),
  
    });

    useEffect(() => {
      dispatch(getExchangesBT());
    }, [dispatch]);
  
    const onSubmit: SubmitHandler<BacktestFormValues> = async (data: BacktestFormValues)=> {
      console.log('backtest', data)
      const formatedBacktestFormValues = {
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
        sell_all: Boolean(data.sellAll),
      }

      console.log('1 formatted data', formatedBacktestFormValues);
      let id;
      try {
        const response = await backtestService.backtestRun(formatedBacktestFormValues);
        id = response.data.id;
        console.log('2 id', id)
      } catch (error) {
          throw new Error ('Some backtest problems')
      }
      dispatch(getMetrics(id));

      // reset();
    }

    const getSymbolsOptions = () => {
      dispatch(getSymbolsBT());
    }

    const getTypesOptions = () => {
      const selectSymbol = getValues('backtestSymbol');
      dispatch(getTypesBT(selectSymbol));
    }

  return(
    <>
     <form className="backtest-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="backtest-form__data">
          <div className="backtest-form_select">
            <AutocompleteSelect
              control={control}
              name='backtestExchange'
              label='Exchange'
              options={exchanges.options}
              isDisabled={exchanges.isDisabled}
              onClose={getSymbolsOptions}
              />

            <AutocompleteSelect
              control={control}
              name='backtestSymbol'
              label='Symbol'
              options={symbols.options}
              isDisabled={symbols.isDisabled}
              onClose={getTypesOptions}
              />
             <AutocompleteSelect
              control={control}
              name='backtestPeriod'
              label='Backtest Period'
              options={mdt.options}
              isDisabled={mdt.isDisabled}
              />
              <AutocompleteSelect
              control={control}
              name='chartPeriod'
              label='ChartPeriod'
              options={mdt.options}
              isDisabled={mdt.isDisabled}
              />
          </div>
            <div className="backtest-form_datepicker">
            <BasicDatePicker control={control} name='startDate' label='Start date'/>
            <BasicDatePicker control={control} name='endDate' label='End date'/>
          </div>
        {/* </div> */}
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
        </div>
        <div className="backtest-form__checkbox"> 
          <CheckboxForm control={control} label='Sel All' name='sellAll' />
         </div>
      <div className="backtest-form__submit">
        <Button variant="contained" sx={{ width:1 }} type='submit'>Run grid backtest</Button>
      </div>
    </form>
    </>
  )
}

export default BacktestForm;


