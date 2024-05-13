import { GridColDef } from '@mui/x-data-grid';
import { INITIAL_PER_PAGE } from '../constants/constants';

export const MY_BACKTESTING_COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'exchange', headerName: 'Exchange', width: 150 },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 150,
  },
  {
    field: 'market_data_type',
    headerName: 'Market Type',
    width: 150,
  },
  {
    field: 'date_start',
    headerName: 'Start Date',
    width: 110,
  },
  {
    field: 'date_end',
    headerName: 'End Date',
    width: 110,
  },
];

export const PAGE_SIZE_TABLE = Number(INITIAL_PER_PAGE);
