import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { metrics } from "../../testData/symbols";

const columns =   [
  { field: 'name', headerName: 'Name', width: 170 },
  { field: 'value', headerName: 'Value', width: 90 },
]


const BacktestTable: React.FC = () => {
  return(
    <>
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
      getRowClassName={(params) => {
        if (params.row.name.includes('Total')) {
         return params.row.value >=0 ? "green" : "red"; 
        }
        return "white"
      }}
      sx={{
      ".green": {
        bgcolor: "lightgreen",
        "&:hover": {
          bgcolor: "lightgreen",
        },
      },
      ".red": {
        bgcolor: "pink",
        "&:hover": {
          bgcolor: "pink",
        },
      },
      border: 0,
      col: grey,
    }}

        rows={metrics}
        columns={columns}

        disableColumnFilter
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooterPagination
        ignoreDiacritics

        rowHeight={25}
        scrollbarSize={500}
       
      />
    </Box>
    </>
  )
};

export default BacktestTable;