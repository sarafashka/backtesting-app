import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
  open: boolean;
}

const Loader: React.FC<LoaderProps> = ({open}) => {
  return (
    <>
     <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      ></Backdrop>
    <CircularProgress sx={{zIndex: (theme) => theme.zIndex.drawer + 2, position: "fixed", top: '50%'}}/>
    </>
  )
  
}

export default Loader;
