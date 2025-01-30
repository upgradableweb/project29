import { Box, CircularProgress, Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material'
import React from 'react'
import { StyledTableCell, StyledTableRow } from './styles'

export default function TablePaginated({ rows, columns, pagination, children }) {

  const { total, page_size, loading, page, ...others } = pagination || {}

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader >
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
          <TableBody>
            {rows.map((row, i) => {
              return (
                <StyledTableRow hover tabIndex={-1} key={i}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={index} align={column.align}>
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
        {pagination &&
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={total}
            page={page - 1}
            rowsPerPage={page_size}
            {...others}
          />}
      </TableContainer>
    </Box>
  )
}
