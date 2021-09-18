// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}

/*
--------------------
API Calls
--------------------

req: chart/userId/timeRange

time ranges:
  day
  week
  month
  3 months
  6 months
  year
  total

  ? what to do if user has insufficient data to populate entire chart?

req: /avgReading/userId

req: meansBellCurve/userId
*/

/*
-----------------
SAMPLE DATA
-----------------
userId: '007' <---- will get from Firebase auth
*/
