import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { symbols } from '../../testData/symbols';
import { useState } from 'react';

const Pricing = () => {
  const [value, setValue] = useState('');

//const onChange
  return(
    <>
    <h1>Pricing</h1>
    <Autocomplete
      onChange={(event, value) => console.log(value, event)}
      disablePortal
      id="combo-box"
      options={symbols}
      sx={{ width: 100 }}
      renderInput={(params) => <TextField {...params} label="Price" />}
    />
    </>
  )
}


export default Pricing;