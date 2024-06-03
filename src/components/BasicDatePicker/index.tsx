import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

interface BasicDatePickerProps  {
  label: string | null;
  name: string;
  control: any,
  minDate?: string;
  maxDate?: string;
  isDisabled?:boolean;
  size: 'small' | 'normal'

}
const BasicDatePicker:React.FC<BasicDatePickerProps> = ({
  label,
  name,
  control,
  minDate,
  maxDate,
  size

}) => {

  const stylesInput = size==='small'
    ? { width: 150, zIndex:2 }
    : { width: 300, zIndex:2 }
  
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
          sx={stylesInput}
          
        />
       </LocalizationProvider>
      )}
    />
   
  );
}
export default BasicDatePicker;