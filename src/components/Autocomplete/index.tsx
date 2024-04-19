import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { Controller } from 'react-hook-form';
import { AxiosResponse } from 'axios';

interface InputMarketDataFormProps  {
  name: string;
  label: string | null;
  control: any,
  isSelected?: () => void
  isDisabled?: boolean | undefined;
  getOptions? :() => Promise<AxiosResponse<string[], any>>;
  getOptionsWithData? :(data:string) => Promise<AxiosResponse<string[], any>>;
  dataForRequest?: string;
};

const AsynchronousSelect:React.FC<InputMarketDataFormProps> = ({
  name,
  label,
  control,
  getOptions,
  getOptionsWithData,
  isSelected,
  isDisabled,
  dataForRequest

}) => {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly string[]>([]);
  const [request, setRequest] = useState<string>('')
  const loading = open && options.length === 0;


  useEffect(() => {
    let active = true;
    console.log('data for request', dataForRequest)
    if (options.length === 0 && dataForRequest != request) {
      if (dataForRequest) setRequest(dataForRequest);
      (async () => {
        let listOfOptions;
        if (name === 'exchange' && getOptions) {
          listOfOptions = await getOptions();
        } else if (getOptionsWithData && dataForRequest) {
          listOfOptions = await getOptionsWithData(dataForRequest);
        }
  
        if (active && listOfOptions) {
          setOptions([...listOfOptions.data]);
        }
      })();
    }

    if (!loading) {
      return undefined;
    }

    return () => {
      active = false;
    };
  }, [open]);

  // React.useEffect(() => {
  //   console.log('request', request)
  //   console.log('data for request', dataForRequest)
  //   if (request != dataForRequest) {
  //     setOptions([]);
  //   }
  // }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "this field is required"
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
          <Autocomplete
            id="asynchronous"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
              console.log('onclose');
              isSelected && isSelected()
            }}

            options={options}
            loading={loading}
            value={
              value || null
            }
            onChange={(event: any, newValue) => {
              onChange(newValue || null);
            }}
            disabled={isDisabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputRef={ref}
        
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
           {error ? (
                <span style={{ color: "red" }}>{error.message}</span>
              ) : null}
          </>
        )}}
    />
  );
}

export default AsynchronousSelect;
