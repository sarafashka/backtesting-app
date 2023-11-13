import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'exchange', headerName: 'Exchange', width: 150 },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 150,
  },
  {
    field: 'type',
    headerName: 'Market Type',
    width: 150,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 110,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 110,
  },
];

const rows = [
  { id:1, exchange: 'binance', symbol:'btcusdt', type:'1h', startDate: '', endDate: ''},

];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}