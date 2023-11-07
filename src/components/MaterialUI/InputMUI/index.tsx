import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputHTMLAttributes } from 'react';
import { ISymbols } from '../../../testData/symbols';


interface ComboBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | null;
  reactHookFormProps?: Record<string, unknown>;
  options: ISymbols[];
}
const ComboBox:React.FC<ComboBoxProps> = ({
  label, options, reactHookFormProps
}) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} {...reactHookFormProps}/>}
    />
  );
}

export default ComboBox;