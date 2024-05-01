import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';



interface InputMarketDataFormProps  {
  name: string;
  label: string | null;
  options: string[];
  control: any,
  isDisabled?: boolean;
};

const SelectForm:React.FC<InputMarketDataFormProps> = ({
  name,
  label,
  options,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="select-label">{label}</InputLabel>
          <Select
            {...field}  
            required  
            label={label} 
            labelId="select-label"
            variant='outlined'>
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    /> 
  ) 
}

export default SelectForm;