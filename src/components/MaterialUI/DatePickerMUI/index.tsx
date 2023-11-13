import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface BasicDatePickerProps  {
  label: string | null;
  onChange: (value:Dayjs | null) => void
}
const BasicDatePicker:React.FC<BasicDatePickerProps> = ({
  label, onChange
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} onChange={onChange}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}
export default BasicDatePicker;