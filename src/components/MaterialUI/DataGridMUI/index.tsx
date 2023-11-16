import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import { COLUMNS, PAGE_SIZE_TABLE } from '../../../constants/marketData';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';



export default function DataGridDemo() {
  const rows = useAppSelector(state => state.marketData.list);
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={COLUMNS}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: PAGE_SIZE_TABLE,
            },
          },
        }}
        pageSizeOptions={[PAGE_SIZE_TABLE]}
      />
    </Box>
  );
}