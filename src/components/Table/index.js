import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({user}) {
  user.sort(function(x, y){
    return new Date(x.createdAt) - new Date(y.createdAt);
  });
  return (
    <TableContainer component={Paper} sx={{marginTop: 2}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Message</TableCell>
            <TableCell align="center">Order Details</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user?.length === 0 && 
          <TableRow>
            <TableCell component="th" align='center' scope="row" colSpan={6}>
              No Orders
            </TableCell>
          </TableRow>}
          {user?.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div>{`0${new Date(row?.createdAt).getDate()}`.slice(-2)}-{`0${new Date(row?.createdAt).getMonth()+1}`.slice(-2)}-{new Date(row?.createdAt).getFullYear()}</div> 
                <div>{new Date(row?.createdAt).getHours()}:{new Date(row?.createdAt).getMinutes()+1}:{new Date(row?.createdAt).getSeconds()}</div>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.message}</TableCell>
              <TableCell align="center">{row.order.map((e)=>
                <div>{e.dishname +'-' + e.qty}</div>
               )}
               </TableCell>
              <TableCell align="right">${row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}