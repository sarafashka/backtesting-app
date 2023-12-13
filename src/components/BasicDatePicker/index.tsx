import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '../MarketDataForm';
import { NameFieldForm } from '../../types/types';

interface BasicDatePickerProps  {
  label: string | null;
  name: NameFieldForm;
  control: Control<FormValues>,
}
const BasicDatePicker:React.FC<BasicDatePickerProps> = ({
  label,
  name,
  control

}) => {

  
  return (
    <Controller name={name} control={control}
      render={({ field: { onChange}}) => (
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker 
          onChange={onChange}
          label={label}
          disableFuture />
      </LocalizationProvider>
      )}
    />
   
  );
}
export default BasicDatePicker;