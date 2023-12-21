import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@mui/material";
import { exchanges, symbols, types } from "../../testData/symbols";
import BasicDatePicker from "../BasicDatePicker";
import SelectForm from "../Select";
import InputForm from "../Input";
import CheckboxForm from "../Checkbox";
import { BacktestFormValues } from "../../types/types";
import './backtestForm.css';

  const formSchema: yup.ObjectSchema <BacktestFormValues> = yup.object().shape({
    backtestExchange: yup.string().required('Exchange is required'),
    backtestSymbol: yup.string().required('Symbol is required'),
    backtestPeriod: yup.string().required('Backtest period is required'),
    chartPeriod: yup.string().required('Chart period is required'),
    startDate: yup.date().default(() => new Date()).required('Date is required'),
    endDate: yup.date().default(() => new Date()).required('Date is required'),
    deposit: yup.number().positive().required('Field is required'),
    commission: yup.number().positive().required('Field is required'),
    priceLow: yup.number().positive().required('Field is required'),
    priceHigh: yup.number().positive().required('Field is required'),
    gridsCount: yup.number().positive().required('Field is required'),
    gridTrigger: yup.number().positive().required('Field is required'),
    gridStopLoss: yup.number().positive().required('Field is required'),
    gridTakeProfit: yup.number().positive().required('Field is required'),
    sellAll: yup.boolean(),
  })

const BacktestForm:React.FC = () => {
  
    const {
      handleSubmit,
      reset,
      control,
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
  
    const onSubmit: SubmitHandler<BacktestFormValues> = (data: BacktestFormValues)=> {
      console.log('backtest', data)
      reset();
    }

  return(
    <>
     <form className="backtest-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="backtest-form__data">
        {/* <div className="backtest-form_option"> */}
          <div className="backtest-form_select">
            <SelectForm control={control} name='backtestExchange' label='Exchange' options={exchanges}/>
            <SelectForm control={control} name='backtestSymbol' label='Symbol' options={symbols}/>
            <SelectForm control={control} name='backtestPeriod' label='Backtest Period' options={types}/>
            <SelectForm control={control} name='chartPeriod' label='Chart Period' options={types}/>
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