import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowParams} from '@mui/x-data-grid';
import { PAGE_SIZE_TABLE } from '../../content/marketData';

interface DataTableProps {
  rows: any;
  columns: GridColDef[];
  onClick?: (event:GridRowParams<any>) => void;
}
const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  onClick,
}) => {


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(event)=>onClick && onClick(event)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: PAGE_SIZE_TABLE,
            },
          },
        }}
        pageSizeOptions={[PAGE_SIZE_TABLE]}
        sx={{
          border: 0,
        }}
      />
    </Box>
  );
}

export default DataTable;