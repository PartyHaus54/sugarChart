import React from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DateTime } from 'luxon';
// const StyledTable = styled.table`
//   border: red solid 2px;
//   width: 100%;
//   text-align: center;
// `;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'red',
    color: 'white',
    padding: 0,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    color: 'white',
    fontSize: 14,
    padding: 0,
    textAlign: 'center'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: 'rgb(255, 97, 97)'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  // [`&.${tableRowsClasses.body}`]: {
  //   fontSize: 14,
  //   padding: 0,
  //   textAlign: 'center'
  // }
}));

const EditReadings = ({readings, userInfo, displayReadingInEdit, setActiveReading, setOpen}) => {
  const handleEditClick = (reading) => {
    displayReadingInEdit(reading);
    setActiveReading(reading);
    setOpen(true);
    console.log(`Modal incoming for reading ${reading}`);
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className="header-row">
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Reading</StyledTableCell>
            {userInfo.details.show_weight && <StyledTableCell>Weight</StyledTableCell>}
            {userInfo.details.show_age && <StyledTableCell>Age</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            readings.map(reading => (
              <StyledTableRow key={reading.id}
                onClick={() => { handleEditClick(reading) }}
              >
                <StyledTableCell >{DateTime.fromISO(reading.observed_date).toFormat('LL-dd-yyyy')}</StyledTableCell>
                {
                  userInfo.details.show_24_hours
                    ?
                    <StyledTableCell>{DateTime.fromISO(reading.observed_time).toFormat('T')}</StyledTableCell>
                    :
                    <StyledTableCell>{DateTime.fromISO(reading.observed_time).toFormat('t')}</StyledTableCell>
                }
                <StyledTableCell>{reading.glucose_level}</StyledTableCell>
                {
                  userInfo.details.show_weight
                  &&
                  <StyledTableCell>{reading.weight_at_reading}</StyledTableCell>
                }
                {
                  userInfo.details.show_age
                  &&
                  <StyledTableCell>{reading.age_at_reading}</StyledTableCell>
                }
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    // <StyledTable>
    //   <thead>
    //     <tr>
    //       <th>Date</th>
    //       <th>Time</th>
    //       <th>Reading</th>
    //       {userInfo.details.show_weight && <th>Weight</th>}
    //       {userInfo.details.show_age && <th>Age</th>}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {readings.map(reading => (
    //       <tr key={reading.id} onClick={() => { handleEditClick(reading); }} >
    //         <td className="date">{DateTime.fromISO(reading.observed_date).toFormat('LL-dd-yyyy')}</td>
    //         {
    //           userInfo.details.show_24_hours
    //             ?
    //             <td className="time">{DateTime.fromISO(reading.observed_time).toFormat('T')}</td>
    //             :
    //             <td className="time">{DateTime.fromISO(reading.observed_time).toFormat('t')}</td>
    //         }
    //         <td className="reading">{reading.glucose_level}</td>
    //         {userInfo.details.show_weight && <td>{reading.weight_at_reading}</td>}
    //         {userInfo.details.show_age && <td>{reading.age_at_reading}</td>}
    //       </tr>
    //     ))}
    //   </tbody>
    // </StyledTable>
  )
}
export default EditReadings;