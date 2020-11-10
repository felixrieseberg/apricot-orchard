import { wildApricot } from "./wild-apricot";
import iCal from 'ical-generator';

class Events {
  public cal?: iCal.ICalCalendar;

  private refreshInterval = 1800000; // 30 minutes

  constructor() {
    this.getCalendar();

    setInterval(() => this.getCalendar(), this.refreshInterval);
  }

  public async getCalendar() {
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

    this.cal = cal;

    console.log(`Finished refreshing feed`);
  }
}

export const events = new Events();
