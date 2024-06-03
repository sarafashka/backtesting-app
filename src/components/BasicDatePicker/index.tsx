import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { green } from '@mui/material/colors';

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

}) => {

  
  return (
    <Controller name={name} control={control}
      render={({ field: { onChange, value, ref}}) => (      
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker 

           value={dayjs(value)}
           inputRef={ref}
           onChange={(date) => {
             onChange(dayjs(date));
           }}
          label={label}
          disableFuture 
          format="DD.MM.YYYY"
          minDate={minDate && dayjs(minDate)}
          maxDate={maxDate && dayjs(maxDate)}
          slotProps={{ textField: { size: 'small' } }}
          sx={{ width: 150, zIndex:2 }}
          
        />
       </LocalizationProvider>
      )}
    />
   
  );
}
export default BasicDatePicker;