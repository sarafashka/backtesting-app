import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

interface CheckboxFormProps  {
  label: string | null;
  name: string;
  control: any,
}
const CheckboxForm:React.FC<CheckboxFormProps> = ({
  label,
  control,
  name

}) => {

  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange}}) => (
        <FormGroup >
          <FormControlLabel name={name} onChange={onChange} control={<Checkbox />} label={label} />
        </FormGroup>
      )}
    />
   
  );
}
export default CheckboxForm;