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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(243, 238, 206)',
    color: 'rgb(34, 180, 159)',
    padding: 0,
    textAlign: 'center',
    cursor: 'pointer'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0,
    textAlign: 'center',
    cursor: 'pointer'
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
}));

const DisplayReadings = ({readings, userInfo, editingReadings, activeReading, updateActiveReading}) => {
  const handleReadingClick = (reading) => {
    updateActiveReading(reading);
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
  )
}

export default DisplayReadings;