import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function AdminDataTable({ columns, rows, loading }) {
  return (
    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Table
        sx={{
          width: '100%',
          tableLayout: 'auto',
          '& .MuiTableCell-root': {
            fontFamily: 'var(--font-07)',
            fontSize: 'medium',
            color: 'black',
            padding: '8px',
            border: '1px solid #dddddd',
          },
        }}
      >
        <TableHead
          sx={{
            display: { xs: 'none', md: 'table-header-group' },
            '& .MuiTableCell-head': {
              fontWeight: 'bold',
              fontFamily: 'var(--font-07)',
            },
          }}
        >
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.label}
                align="center"
                sx={{
                  width: column.width,
                  whiteSpace: 'nowrap',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            display: { xs: 'block', md: 'table-row-group' },
          }}
        >
          {loading ? (
            <TableRow
              sx={{
                display: { xs: 'block', md: 'table-row' },
              }}
            >
              <TableCell
                colSpan={columns.length}
                align="center"
                sx={{
                  display: { xs: 'block', md: 'table-cell' },
                }}
              >
                LOADING...
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  display: { xs: 'block', md: 'table-row' },
                  mb: { xs: 1.5, md: 0 },
                  border: {
                    xs: '1px solid black',
                    md: 'none',
                  },
                  borderRadius: {
                    xs: 1,
                    md: 0,
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: '#f2f2f2',
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.label}
                    align="center"
                    sx={{
                      width: { md: column.width },

                      display: {
                        xs: 'flex',
                        md: 'table-cell',
                      },

                      justifyContent: 'center',
                      alignItems: 'center',

                      textAlign: 'center',

                      border: {
                        xs: 'none',
                        md: '1px solid #ddd',
                      },

                      '& svg': {
                        cursor: 'pointer',
                      },

                      '&:not(:last-child)': {
                        borderBottom: {
                          xs: '1px dashed #505050',
                          md: 'none',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      {column.render(row)}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminDataTable;
