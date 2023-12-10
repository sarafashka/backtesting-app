import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';


interface InputMarketDataFormProps  {
  name: string;
  label: string | null;
  options: string[];
  isDisabled?: boolean;
}

const InputMarketDataForm:React.FC<InputMarketDataFormProps> = ({
  name,
  label,
  options,
  isDisabled,
  ...rest
}) => {

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller name={name} control={control}
           render={({ field }) => (
           <TextField 
              {...field }
              label={label}
              select
              variant='standard'
              {...rest}
              defaultValue=''
              error={!!errors[name]}
              // helperText={errors[name]?.message ?? 'Something went wrong'}
            >
              {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </TextField>
           )}
           />
  );
}

export default InputMarketDataForm;