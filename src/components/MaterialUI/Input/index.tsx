import { Input, styled } from "@mui/material";
import styles from './style';

export const InputForm =  styled(Input)({ ...styles })

interface InputProps  {
  name: string;
  label: string | null;
  control: any
}

export const InputComponent: React.FC<InputProps> = ({ 
  name,
  label,
  control
}) => {
  return (
      <InputForm 
      name={name}
      control={control} 
      label={label}>
      </InputForm>
        )}
