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
/*
import styled from '@emotion/styled';

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
`;

var StyledTableRow = styled.tr`
  border: white solid 2px;
`;

var StyledActiveTableRow = styled.tr`
  border: red solid 2px;
`;

var activeRowStyle = {
  outline: 'white solid 2px'
}
*/

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(243, 238, 206)',
    color: 'rgb(34, 180, 159)',
    padding: 0,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0,
    textAlign: 'center'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#74c4b8'
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

const DisplayReadings = ({readings, userInfo, editingReadings, activeReading, updateActiveReading}) => {
  const handleReadingClick = (reading) => {
    updateActiveReading(reading);
    console.log(`The active reading has been set to:`, reading);
  }



  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className="header-row">
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Reading</StyledTableCell>
            { userInfo.details.show_weight && <StyledTableCell>Weight</StyledTableCell> }
            { userInfo.details.show_age && <StyledTableCell>Age</StyledTableCell> }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            readings.map(reading => (
              <StyledTableRow key={reading.id}
                style={reading.id === activeReading.id ? { backgroundColor: 'rgb(243, 238, 206)'} : null}
                onClick={() => { handleReadingClick(reading) }}
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
    // <table>
    //   <thead>
    //     <tr>
    //       <th>Date</th>
    //       <th>Time</th>
    //       <th>Reading</th>
    //       { userInfo.details.show_weight && <th>Weight</th> }
    //       { userInfo.details.show_age && <th>Age</th> }
    //       { editingReadings && <th>Edit</th> }
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {readings.map((reading) => (
    //       <tr key={reading.id}
    //         style={reading.id === activeReading.id ? activeRowStyle : null}
    //         onClick={() => {handleReadingClick(reading)}}
    //       >
    //         <td className="date">{DateTime.fromISO(reading.observed_date).toFormat('LL-dd-yyyy')}</td>
    //         {
    //           userInfo.details.show_24_hours
    //             ?
    //           <td className="time">{DateTime.fromISO(reading.observed_time).toFormat('T')}</td>
    //             :
    //           <td className="time">{DateTime.fromISO(reading.observed_time).toFormat('t')}</td>
    //         }
    //         <td className="reading">{reading.glucose_level}</td>
    //         {userInfo.details.show_weight && <td>{reading.weight_at_reading}</td>}
    //         {userInfo.details.show_age && <td>{reading.age_at_reading}</td>}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  )
}

export default DisplayReadings;