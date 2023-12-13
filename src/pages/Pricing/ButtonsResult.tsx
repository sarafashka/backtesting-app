
import { useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface NestedInputProps  {
  name: string;
  label: string | null;
  options: string [];
}

export default function NestedInput(props: NestedInputProps) {
  const { register,
    //  formState: { errors },
     } = useFormContext() // retrieve all hook methods


  return <Autocomplete 
        options={props.options}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} {...register(props.name)} label={props.label} variant="standard"  />
        )}
      />
}

