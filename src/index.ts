import express from 'express';
import { events } from './ical';

const app = express();
const port = process.env.PORT || 3030;

async function main() {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  });

  app.get('/ics', (req, res) => {
    if (events.cal) {
      events.cal.serve(res);
    }
  });

  app.listen(port, () => {
    console.log(`Apricot Orchard listening at http://localhost:${port}`)
  });
}

main();
