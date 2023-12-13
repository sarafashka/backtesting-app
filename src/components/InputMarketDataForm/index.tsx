import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { NameFieldForm } from '../../types/types';
import { FormValues } from '../MarketDataForm';


interface InputMarketDataFormProps  {
  name: NameFieldForm;
  label: string | null;
  options: string[];
  control: Control<FormValues>,
  isDisabled?: boolean;
};

const InputMarketDataForm:React.FC<InputMarketDataFormProps> = ({
  name,
  label,
  options,
  control,
  isDisabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="select-label">{label}</InputLabel>
          <Select {...field} required label={label} labelId="select-label">
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

export default InputMarketDataForm;