import express from 'express';
import { getCalendar } from './ical';

const app = express();
const port = process.env.PORT || 3030;
const cacheMaxAge = 60 * 30; // 30 minutes;

app.get('/ics', async (req, res) => {
  const calendar = await getCalendar();

  res.writeHead(200, {
    'Cache-Control': `s-max-age=${cacheMaxAge}, stale-while-revalidate`,
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="calendar.ics"'
  });

  res.end(calendar.toString());
});

export default app;
