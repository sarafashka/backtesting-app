import { Autocomplete, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FormValues } from ".";

const options = ['ten', 'twenty', 'thirty']

export default function SelectForm({control}: {control: Control<FormValues>}) {
  
  return (
   <Controller
    render={({ field }) => (
      <Select {...field} required label='Number'>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    )}
    name="Select"
    control={control}
  /> 
  ) 
}

