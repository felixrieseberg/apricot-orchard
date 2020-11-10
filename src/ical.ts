import { wildApricot } from "./wild-apricot";
import iCal from 'ical-generator';

export async function getCalendar() {
  console.log(`Refreshing ics feed from Wild Apricot`);

  const events = await wildApricot.getEvents();
  const cal = iCal({
    domain: 'ggtc.org',
    prodId: {
      company: 'Golden Gate Triathlon Club',
      product: 'GGTC'
    },
    name: 'GGTC Events',
    timezone: 'America/Los_Angeles'
  });

  for (const event of events) {
    cal.createEvent({
      start: event.StartDate,
      end: event.EndDate,
      summary: event.Name,
      url: event.Url,
      location: event.Location,
    });
  }

  console.log(`Finished refreshing feed`);

  return cal;
}
