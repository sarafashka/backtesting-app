import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
// import {MarketDataFormValues, BacktestFormValues} from '../../types/types';

interface BasicDatePickerProps  {
  label: string | null;
  name: string;
  control: any,
  minDate?: string;
  maxDate?: string;
  isDisabled?:boolean;

}
const BasicDatePicker:React.FC<BasicDatePickerProps> = ({
  label,
  name,
  control,
   minDate,
  maxDate,
  isDisabled

}) => {

  
  return (
    <Controller name={name} control={control}
      render={({ field: { onChange}}) => (
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker 
          onChange={onChange}
          label={label}
          disableFuture 
          format="DD.MM.YYYY"
          minDate={minDate && dayjs(minDate)}
          maxDate={maxDate && dayjs(maxDate)}
          disabled={isDisabled}
          
        />
      </LocalizationProvider>
      )}
    />
   
  );
}
export default BasicDatePicker;