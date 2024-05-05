import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { Controller } from 'react-hook-form';

interface InputMarketDataFormProps  {
  name: string;
  label: string | null;
  control: any,
  options: string[],
  isDisabled: boolean;
  onClose?: () => void;

};

const AutocompleteSelect:React.FC<InputMarketDataFormProps> = ({
  name,
  label,
  control,
  options,
  isDisabled,
  onClose,

}) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "This field is required"
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
          <Autocomplete
            id="autocompleteSelect"
            sx={{ width: 300 }}
            options={options}
            // loading={loading}
            value={
              value || null
            }
            onChange={(event: any, newValue) => {
              console.log(event)
              onChange(newValue || null);
            }}
            onClose={() => {onClose && onClose()}}
            disabled={isDisabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputRef={ref}
        
                InputProps={{
                  ...params.InputProps,
                  // endAdornment: (
                  //   <React.Fragment>
                  //     {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  //     {params.InputProps.endAdornment}
                  //   </React.Fragment>
                  // ),
                }}
              />
            )}
          />
           {error ? (
                <span style={{ color: "red", fontSize: '14px', lineHeight: '0' }}>{error.message}</span>
              ) : null}
          </>
        )}}
    />
  );
}

 export default AutocompleteSelect;
