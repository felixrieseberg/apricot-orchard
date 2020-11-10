"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendar = void 0;
const wild_apricot_1 = require("./wild-apricot");
const ical_generator_1 = __importDefault(require("ical-generator"));
async function getCalendar() {
    console.log(`Refreshing ics feed from Wild Apricot`);
    const events = await wild_apricot_1.wildApricot.getEvents();
    const cal = ical_generator_1.default({
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
exports.getCalendar = getCalendar;
//# sourceMappingURL=ical.js.map