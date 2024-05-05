import { Typography } from "@mui/material";
import Link from '@mui/material/Link';
import "./footer.css"

const Footer = () => {
  return(
    <>
    <div className="footer">
      <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        My app
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </div>
    </>
  )
};

export default Footer;