"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ical_1 = require("./ical");
const app = express_1.default();
const port = process.env.PORT || 3030;
const cacheMaxAge = 60 * 30; // 30 minutes;
app.get('/ics', async (req, res) => {
    const calendar = await ical_1.getCalendar();
    res.writeHead(200, {
        'Cache-Control': `s-max-age=${cacheMaxAge}, stale-while-revalidate`,
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="calendar.ics"'
    });
    res.end(calendar.toString());
});
exports.default = app;
//# sourceMappingURL=index.js.map