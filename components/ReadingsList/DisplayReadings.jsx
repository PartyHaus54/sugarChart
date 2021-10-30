import React from 'react';

import { DateTime } from 'luxon';


const DisplayReadings = ({readings, userInfo, editingReadings}) => {
  const handleReadingClick = (readingId) => {
    console.log(`This will highlight the point ${readingId} in the chart later`)
  }

  return (
    <table>
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
          <tr key={reading.id} onClick={() => {handleReadingClick(reading.id)}}>
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
    </table>
  )
}

export default DisplayReadings;