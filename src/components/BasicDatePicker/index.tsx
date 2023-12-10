import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useFormContext } from 'react-hook-form';

interface BasicDatePickerProps  {
  label: string | null;
}
const BasicDatePicker:React.FC<BasicDatePickerProps> = ({
  label,

}) => {

  const {
    control,
  } = useFormContext();
  
  return (
    <Controller name='startDate' control={control}
      render={({ field }) => (
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker {...field } label={label} />
        </DemoContainer>
      </LocalizationProvider>
      )}
    />
   
  );
}
export default BasicDatePicker;