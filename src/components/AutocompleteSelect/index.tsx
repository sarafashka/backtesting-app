import './autocompleteSelect.scss';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { Controller } from 'react-hook-form';

interface InputMarketDataFormProps  {
  name: string;
  label?: string | null;
  control: any,
  options: string[],
  isDisabled?: boolean;
  size?: 'smallSize' | 'normalSize',
  changeValue?: (name: string) => Promise<void>;

};

const AutocompleteSelect:React.FC<InputMarketDataFormProps> = ({
  name,
  label,
  control,
  options,
  changeValue,
  isDisabled,
  size

}) => {

  const stylesInput = size==='smallSize' 
   ? {style: {
    fontSize: 12,
    padding: 1,
    width:100,
   }} 
  : {style: {
    fontSize: 16,
    width: 200
  }}

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
            sx={{ width: 100, zIndex:2 }}
            disableClearable
            disabled={isDisabled}
            options={options}
            // loading={loading}
            value={
              value || null
            }
            onChange={(event: any, newValue) => {
              event.stopPropagation();
              onChange(newValue || null);
              changeValue && changeValue(name)
            }}
            ListboxProps={{
              ...stylesInput
            }}

            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputRef={ref}
        
                InputProps={{
                  ...params.InputProps,
                  ...stylesInput
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
