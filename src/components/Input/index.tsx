
import {  TextField } from '@mui/material';
import { Controller } from 'react-hook-form';


interface InputFormProps  {
  name: string;
  label: string | null;
  control: any,
  type?:string
  // Control<FormValues> | Control<BacktestFormValues>,
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
              // {...field} 
              id={name}
              label={label}
              // inputRef={ref}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
              variant="standard"
              type={type || 'number'}
              autoComplete='off'
            />
      )}
    /> 
  ) 
}

export default InputForm;