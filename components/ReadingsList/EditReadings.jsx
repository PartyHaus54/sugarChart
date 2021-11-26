import React, {useState} from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DateTime } from 'luxon';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'red',
    color: 'white',
    padding: 0,
    textAlign: 'center',
    cursor: 'pointer'
  },
  [`&.${tableCellClasses.body}`]: {
    color: 'white',
    fontSize: 14,
    padding: 0,
    textAlign: 'center',
    cursor: 'pointer'
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
}));

const EditReadings = ({readings, userInfo, displayReadingInEdit, setActiveReading, setOpen}) => {
  const [observedDate, setObservedDate] = useState(null)

  const handleEditClick = (reading) => {
    displayReadingInEdit(reading);
    setActiveReading(reading);
    setOpen(true);
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
  )
}
export default EditReadings;