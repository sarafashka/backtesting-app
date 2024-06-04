import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { useAppSelector } from "../../hooks/reduxTypedHooks";
import { formatMetricsToRows } from "../../utils/utils";

const columns =   [
  { field: 'name', headerName: 'Metric ', width: 250 },
  { field: 'value', headerName: 'Value', width: 90 },
]


const BacktestMetrics: React.FC = () => {

  const metrics = useAppSelector(state => state.backtest.metrics); 

  return(
    <>
    {metrics &&
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        getRowClassName={(params) => {
          if (params.row.name.includes('Total')) {
            return Number(params.row.value) >=0 ? "green" : "red"; 
  
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

        rows={formatMetricsToRows(metrics)}
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
  }
   </>
  )
};

export default BacktestMetrics;