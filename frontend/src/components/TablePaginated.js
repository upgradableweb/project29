import { Box, CircularProgress, Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material'
import React from 'react'
import { StyledTableCell, StyledTableRow } from './styles'

export default function TablePaginated({ rows, columns, pagination, children }) {

  const { total, page_size, loading, page, ...others } = pagination || {}

  columns = [{ label: "Sl No.", id: "sl", minWidth: 80 }, ...columns]
  return (
    <Box>
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {columns.map((column, index) => (
                <StyledTableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody >
            {rows.map((row, i) => {
              row.sl = i + 1
              return (
                <StyledTableRow hover tabIndex={-1} key={row._id}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={index}>
                        {value}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        {loading && <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}><CircularProgress /></Box>}
        {children}

      </TableContainer>
      {pagination &&
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={total}
          page={page - 1}
          rowsPerPage={page_size}
          {...others}
        />}
    </Box>
  )
}
