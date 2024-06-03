
import {  TextField } from '@mui/material';
import { Controller } from 'react-hook-form';


interface InputFormProps  {
  name: string;
  label: string | null;
  control: any,
  type?:string
  isDisabled?: boolean;
};

const InputForm:React.FC<InputFormProps> = ({
  name,
  label,
  control,
  type,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange}, fieldState: {error}  }) => (
           <TextField
              id={name}
              label={label}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size='small'
              type={type || 'number'}
              autoComplete='off'
              inputProps={{
                style: {
                 width:90,
              }}}
              InputLabelProps={{
                style: {
                  fontSize: 12,
                  padding: 2,
                  width:100,
               }}}
            
            />
      )}
    /> 
  ) 
}

export default InputForm;