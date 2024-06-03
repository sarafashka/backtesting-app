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
  changeValue?: (name: string) => Promise<void>;

};

const AutocompleteSelect:React.FC<InputMarketDataFormProps> = ({
  name,
  label,
  control,
  options,
  changeValue

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
            disableClearable
            sx={{ width: 100, zIndex:2 }}
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
              style: {
                fontSize: 12,
              }
            }}

            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputRef={ref}
                sx={{width: '10rem'}}

        
                InputProps={{
                  ...params.InputProps,
                  style: {
                    fontSize: 12,
                    padding: 2,
                    width:100,
                  }
                  
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
