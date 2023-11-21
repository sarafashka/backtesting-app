import { Button, styled } from "@mui/material";
import styles from './style';

const ButtonComponent = styled(Button)({ ...styles });

export default function StyledComponent() {
  return <ButtonComponent>StyledComponent</ButtonComponent>;
}