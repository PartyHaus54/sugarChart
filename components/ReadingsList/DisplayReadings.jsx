import React from 'react';
import styled from '@emotion/styled';

const StyledTable = styled.table`
  //border: white solid 2px;
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

import { DateTime } from 'luxon';


const DisplayReadings = ({readings, userInfo, editingReadings, activeReading, setActiveReading}) => {
  const handleReadingClick = (reading) => {
    setActiveReading(reading);
    console.log(`The active reading has been set to:`, reading);
  }



  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Reading</th>
          { userInfo.details.show_weight && <th>Weight</th> }
          { userInfo.details.show_age && <th>Age</th> }
          { editingReadings && <th>Edit</th> }
        </tr>
      </thead>
      <tbody>
        {readings.map((reading) => (
          <tr key={reading.id}
            style={reading.id === activeReading.id ? activeRowStyle : null}
            onClick={() => {handleReadingClick(reading)}}
          >
            <td className="date">{DateTime.fromISO(reading.observed_date).toFormat('LL-dd-yyyy')}</td>
            {
              userInfo.details.show_24_hours
                ?
              <td className="time">{DateTime.fromISO(reading.observed_time).toFormat('T')}</td>
                :
              <td className="time">{DateTime.fromISO(reading.observed_time).toFormat('t')}</td>
            }
            <td className="reading">{reading.glucose_level}</td>
            {userInfo.details.show_weight && <td>{reading.weight_at_reading}</td>}
            {userInfo.details.show_age && <td>{reading.age_at_reading}</td>}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default DisplayReadings;