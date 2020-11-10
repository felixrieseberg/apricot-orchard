import { getCalendar } from './calendar';

const cacheMaxAge = 60 * 30; // 30 minutes;

async function app(req: any, res: any) {
  const calendar = await getCalendar();

  res.writeHead(200, {
    'Cache-Control': `s-max-age=${cacheMaxAge}, stale-while-revalidate`,
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="calendar.ics"'
  });

  res.end(calendar.toString());
};

export default app;
