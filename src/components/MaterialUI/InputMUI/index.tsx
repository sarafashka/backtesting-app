import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SyntheticEvent } from 'react';
import { ISymbols } from '../../../testData/symbols';


interface ComboBoxProps  {
  label: string | null;
  options: ISymbols[];
  onChange?: (event: SyntheticEvent, value: ISymbols | null) => void
  reactHookFormProps?: Record<string, unknown>;
  isDisabled?: boolean;

}


const ComboBox:React.FC<ComboBoxProps> = ({
  label,
  options,
  reactHookFormProps,
  onChange,
  isDisabled,
  ...rest
}) => {

  return (
    <Autocomplete
      disablePortal
      disableClearable
      disabled={isDisabled}
      id="combo-box"
      options={options}
      sx={{ width: 300 }}
      onChange={onChange}
      {...rest}
      {...reactHookFormProps}
      renderInput={(params) => <TextField {...params} label={label}/>}
    />
  );
}

export default ComboBox;